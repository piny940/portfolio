import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import { Profile } from '@/resources/types'
import {
  sortBlogsByPublishedAt,
  sortProjectsByFavorite,
  sortTechStacksByProficiency,
} from '@/utils/helpers'
import { FetchAllDataQuery, Project, getSdk } from './_types'
import { GraphQLClient } from 'graphql-request'

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

const sdk = getSdk(
  new GraphQLClient(`${process.env.BACKEND_HOST || ''}/v1/query`, {
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_TOKEN || ''}`,
    },
  })
)

export interface PortfolioData extends FetchAllDataQuery {
  profile: Profile
}
export const getPortfolioData = async () => {
  const profile = new YamlLoader().load<Profile>('src/data/profile.yml')
  const data = await sdk.fetchAllData()
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
