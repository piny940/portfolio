import { existsSync, readFileSync, readdirSync } from 'fs'
import path from 'path'
import { load } from 'js-yaml'
import { ZodType, z } from 'zod'
import {
  blogsFileSchema,
  profileEntrySchema,
  projectsFileSchema,
  technologiesFileSchema,
} from './schema'
import { Blog, Profile, Project, Technology } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content')
const DOCUMENTS_DIR = path.join(process.cwd(), 'documents')
const LOGO_DIR = path.join(process.cwd(), 'public', 'images', 'skills')
const LOGO_URL_PREFIX = '/images/skills'

const formatIssues = (error: z.ZodError) =>
  error.issues
    .map(issue => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
    .join('\n')

const readYaml = <T>(filename: string, schema: ZodType<T>): T => {
  const filePath = path.join(CONTENT_DIR, filename)
  const parsed = schema.safeParse(load(readFileSync(filePath, 'utf8')))
  if (!parsed.success) {
    throw new Error(
      `Invalid content in content/${filename}:\n${formatIssues(parsed.error)}`,
    )
  }
  return parsed.data
}

const markdownIds = () => {
  if (!existsSync(DOCUMENTS_DIR)) return []
  return readdirSync(DOCUMENTS_DIR)
    .filter(filename => filename.endsWith('.md'))
    .map(filename => filename.replace(/\.md$/, ''))
}

type Content = {
  technologies: Technology[]
  projects: Project[]
  blogs: Blog[]
  profile: Profile
  projectIdsWithBlog: string[]
}

let cache: Content | undefined

const loadContent = (): Content => {
  if (cache) return cache

  const technologyEntries = readYaml('technologies.yml', technologiesFileSchema)
  const projectEntries = readYaml('projects.yml', projectsFileSchema)
  const blogEntries = readYaml('blogs.yml', blogsFileSchema)
  const profile = readYaml('profile.yml', profileEntrySchema)

  const problems: string[] = []
  const bySlug = new Map<string, Technology>()

  for (const entry of technologyEntries) {
    if (bySlug.has(entry.slug)) {
      problems.push(`technologies.yml: duplicate slug "${entry.slug}"`)
      continue
    }
    if (entry.logo && !existsSync(path.join(LOGO_DIR, entry.logo))) {
      problems.push(
        `technologies.yml: "${entry.slug}" refers to a missing logo `
        + `public/images/technologies/${entry.logo}`,
      )
    }
    bySlug.set(entry.slug, {
      slug: entry.slug,
      name: entry.name,
      tagColor: entry.tagColor,
      logoUrl: entry.logo ? `${LOGO_URL_PREFIX}/${entry.logo}` : null,
      proficiency: entry.proficiency ?? null,
    })
  }

  const resolveTags = (source: string, slugs: string[]) =>
    slugs.reduce<Technology[]>((acc, slug) => {
      const technology = bySlug.get(slug)
      if (!technology) {
        problems.push(`${source}: unknown technology "${slug}"`)
        return acc
      }
      return [...acc, technology]
    }, [])

  const seenProjectIds = new Set<string>()
  const projects = projectEntries.map((entry): Project => {
    if (seenProjectIds.has(entry.id)) {
      problems.push(`projects.yml: duplicate id "${entry.id}"`)
    }
    seenProjectIds.add(entry.id)
    return {
      id: entry.id,
      title: entry.title,
      description: entry.description,
      isFavorite: entry.isFavorite,
      links: {
        app: entry.links.app ?? null,
        github: entry.links.github ?? null,
        qiita: entry.links.qiita ?? null,
      },
      tags: resolveTags(`projects.yml (${entry.id})`, entry.tags),
    }
  })

  const projectIdsWithBlog = markdownIds()
  for (const id of projectIdsWithBlog) {
    if (!seenProjectIds.has(id)) {
      problems.push(
        `documents/${id}.md has no matching project in projects.yml`,
      )
    }
  }

  const blogs = blogEntries.map(
    (entry): Blog => ({
      title: entry.title,
      url: entry.url,
      publishedAt: entry.publishedAt,
      tags: resolveTags(`blogs.yml (${entry.url})`, entry.tags),
    }),
  )

  if (problems.length > 0) {
    throw new Error(`Content validation failed:\n${problems.map(p => `  - ${p}`).join('\n')}`)
  }

  cache = {
    technologies: [...bySlug.values()],
    projects: projects
      .map((project, index) => ({ project, index }))
      .sort((a, b) => {
        if (a.project.isFavorite !== b.project.isFavorite) {
          return a.project.isFavorite ? -1 : 1
        }
        return a.index - b.index
      })
      .map(({ project }) => project),
    blogs: [...blogs].sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt),
    ),
    profile,
    projectIdsWithBlog,
  }
  return cache
}

export const getTechnologies = (): Technology[] => loadContent().technologies

export const getTechnology = (slug: string): Technology | undefined =>
  loadContent().technologies.find(technology => technology.slug === slug)

export const getTechStacks = (): Technology[] =>
  loadContent()
    .technologies.filter(technology => technology.proficiency !== null)
    .sort((a, b) => (b.proficiency ?? 0) - (a.proficiency ?? 0))

export const getProjects = (): Project[] => loadContent().projects

export const getProject = (id: string): Project | undefined =>
  loadContent().projects.find(project => project.id === id)

export const getBlogs = (): Blog[] => loadContent().blogs

export const getProfile = (): Profile => loadContent().profile

export const getProjectIdsWithBlog = (): string[] =>
  loadContent().projectIdsWithBlog

export const getBlogContent = (projectId: string): string | undefined => {
  try {
    return readFileSync(path.join(DOCUMENTS_DIR, `${projectId}.md`), 'utf8')
  }
  catch {
    return undefined
  }
}
