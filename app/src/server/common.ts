import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import {
  Blog,
  Profile,
  Project,
  TechStack,
  Technology,
} from '@/resources/types'
import { queryGql } from '@/utils/api'
import {
  sortBlogsByPublishedAt,
  sortProjectsByFavorite,
  sortTechStacksByProficiency,
} from '@/utils/helpers'

export class FileLoader {
  load = (filename: string) => {
    try {
      return readFileSync(filename, 'utf8')
    } catch {
      return undefined
    }
  }
}

export class YamlLoader {
  #fileLoader: FileLoader

  constructor() {
    this.#fileLoader = new FileLoader()
  }

  load = <T = any>(filename: string): T => {
    const content = this.#fileLoader.load(filename) || ''
    return load(content) as T
  }
}

const portfolioQuery = `
query {
  blogs {
    id
    title
    url
    publishedAt
    tags {
      id
      name
      tagColor
      logoUrl
    }
  }
  projects {
    id
    title
    description
    isFavorite
    appLink
    githubLink
    qiitaLink
    tags {
      id
      name
      tagColor
      logoUrl
    }
  }
  techStacks {
    id
    technology {
      id
      name
      tagColor
      logoUrl
    }
    proficiency
  }
  technologies {
    id
    name
    tagColor
    logoUrl
  }
}
`
export type PortfolioData = {
  profile: Profile
  blogs: Blog[]
  projects: Project[]
  techStacks: TechStack[]
  technologies: Technology[]
}
export const loadPortfolioData = async () => {
  const profile = new YamlLoader().load<Profile>('src/data/profile.yml')
  const data = await queryGql<{
    blogs: Blog[]
    projects: Project[]
    techStacks: TechStack[]
    technologies: Technology[]
  }>(portfolioQuery)
  data.projects = pickContent(data.projects)
  data.projects = sortProjectsByFavorite(data.projects)
  data.techStacks = sortTechStacksByProficiency(data.techStacks)
  data.blogs = sortBlogsByPublishedAt(data.blogs)
  return {
    ...data,
    profile,
  }
}

const pickContent = (projects: Project[]) => {
  return projects.map((project) => {
    const loader = new FileLoader()
    const content = loader.load(`src/data/documents/${project.id}.md`) || null
    return {
      ...project,
      blogContent: content,
    }
  })
}
