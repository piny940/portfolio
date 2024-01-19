import { readFileSync } from 'fs'
import { IFileLoader, IYamlLoader } from './_common'
import { load } from 'js-yaml'
import {
  Blog,
  Profile,
  Project,
  TechStack,
  Technology,
} from '@/resources/types'
import { queryGql } from '@/utils/api'
import { ProfileLoader } from './profile'
import {
  sortBlogsByPublishedAt,
  sortProjectsByFavorite,
  sortTechStacksByProficiency,
} from '@/utils/helpers'

export class FileLoader implements IFileLoader {
  load = (filename: string) => {
    try {
      return readFileSync(filename, 'utf8')
    } catch {
      return ''
    }
  }
}

export class YamlLoader implements IYamlLoader {
  #fileLoader: FileLoader

  constructor() {
    this.#fileLoader = new FileLoader()
  }

  load = <T = any>(filename: string): T => {
    const content = this.#fileLoader.load(filename)
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
  const profileLoader = new ProfileLoader(new YamlLoader())
  const profile = profileLoader.load()
  const data = await queryGql<{
    blogs: Blog[]
    projects: Project[]
    techStacks: TechStack[]
    technologies: Technology[]
  }>(portfolioQuery)
  data.projects = sortProjectsByFavorite(data.projects)
  data.techStacks = sortTechStacksByProficiency(data.techStacks)
  data.blogs = sortBlogsByPublishedAt(data.blogs)
  return {
    ...data,
    profile,
  }
}
