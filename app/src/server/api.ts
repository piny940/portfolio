import { GraphQLClient } from 'graphql-request'
import { FetchAllDataQuery, Project, getSdk } from './_types'
import { Profile } from '@/resources/types'
import { FileLoader, YamlLoader } from './loader'
import {
  sortBlogsByPublishedAt,
  sortProjectsByFavorite,
  sortTechStacksByProficiency,
} from './helpers'

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
export const getProjects = async () => {
  const data = await sdk.fetchProjects()
  return sortProjectsByFavorite(pickContent(data.projects))
}
export const getProject = async (id: string) => {
  const data = await sdk.fetchProject({ id })
  return pickContent([data.project])[0]
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
