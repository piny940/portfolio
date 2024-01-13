import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends Record<string, unknown>,
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  Time: { input: string; output: string }
  Uint: { input: number; output: number }
}

export type Blog = {
  __typename?: 'Blog'
  createdAt: Scalars['Time']['output']
  id: Scalars['Uint']['output']
  kind: Scalars['Int']['output']
  tags: Technology[]
  title: Scalars['String']['output']
  updatedAt: Scalars['Time']['output']
  url: Scalars['String']['output']
}

export type BlogInput = {
  kind: Scalars['Int']['input']
  title: Scalars['String']['input']
  url: Scalars['String']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  createBlog: Blog
  createProject: Project
  createTechStack: TechStack
  createTechnology: Technology
  deleteBlog: Blog
  deleteProject: Project
  deleteTechStack: TechStack
  deleteTechnology: Technology
  updateBlog: Blog
  updateBlogTags: Array<Maybe<Technology>>
  updateProject: Project
  updateProjectTags: Technology[]
  updateTechStack: TechStack
  updateTechnology: Technology
}

export type MutationCreateBlogArgs = {
  input: BlogInput
}

export type MutationCreateProjectArgs = {
  input: ProjectInput
}

export type MutationCreateTechStackArgs = {
  input: TechStackInput
}

export type MutationCreateTechnologyArgs = {
  input: TechnologyInput
}

export type MutationDeleteBlogArgs = {
  id: Scalars['Uint']['input']
}

export type MutationDeleteProjectArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteTechStackArgs = {
  id: Scalars['Uint']['input']
}

export type MutationDeleteTechnologyArgs = {
  id: Scalars['Uint']['input']
}

export type MutationUpdateBlogArgs = {
  id: Scalars['Uint']['input']
  input: BlogInput
}

export type MutationUpdateBlogTagsArgs = {
  id: Scalars['Uint']['input']
  tags: Array<Scalars['Uint']['input']>
}

export type MutationUpdateProjectArgs = {
  input: ProjectInput
}

export type MutationUpdateProjectTagsArgs = {
  id: Scalars['String']['input']
  tags: Array<Scalars['Uint']['input']>
}

export type MutationUpdateTechStackArgs = {
  id: Scalars['Uint']['input']
  input: TechStackInput
}

export type MutationUpdateTechnologyArgs = {
  id: Scalars['Uint']['input']
  input: TechnologyInput
}

export type Project = {
  __typename?: 'Project'
  appLink?: Maybe<Scalars['String']['output']>
  createdAt: Scalars['Time']['output']
  description: Scalars['String']['output']
  githubLink?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  isFavorite: Scalars['Boolean']['output']
  qiitaLink?: Maybe<Scalars['String']['output']>
  tags: Technology[]
  title: Scalars['String']['output']
  updatedAt: Scalars['Time']['output']
}

export type ProjectInput = {
  appLink?: InputMaybe<Scalars['String']['input']>
  description: Scalars['String']['input']
  githubLink?: InputMaybe<Scalars['String']['input']>
  id: Scalars['String']['input']
  isFavorite: Scalars['Boolean']['input']
  qiitaLink?: InputMaybe<Scalars['String']['input']>
  title: Scalars['String']['input']
}

export type Query = {
  __typename?: 'Query'
  blog: Blog
  blogs: Blog[]
  me?: Maybe<Scalars['String']['output']>
  project: Project
  projects: Project[]
  techStack: TechStack
  techStacks: TechStack[]
  technologies: Technology[]
  technology: Technology
}

export type QueryBlogArgs = {
  id: Scalars['Uint']['input']
}

export type QueryProjectArgs = {
  id: Scalars['String']['input']
}

export type QueryTechStackArgs = {
  id: Scalars['Uint']['input']
}

export type QueryTechnologyArgs = {
  id: Scalars['Uint']['input']
}

export type TechStack = {
  __typename?: 'TechStack'
  createdAt: Scalars['Time']['output']
  id: Scalars['Uint']['output']
  proficiency: Scalars['Int']['output']
  technology: Technology
  technologyId: Scalars['Uint']['output']
  updatedAt: Scalars['Time']['output']
}

export type TechStackInput = {
  proficiency: Scalars['Int']['input']
  technologyId: Scalars['Uint']['input']
}

export type Technology = {
  __typename?: 'Technology'
  createdAt: Scalars['Time']['output']
  id: Scalars['Uint']['output']
  logoUrl?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
  tagColor: Scalars['String']['output']
  updatedAt: Scalars['Time']['output']
}

export type TechnologyInput = {
  logoUrl?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  tagColor: Scalars['String']['input']
}

export type GetBlogsQueryVariables = Exact<Record<string, never>>

export type GetBlogsQuery = {
  __typename?: 'Query'
  blogs: Array<{
    __typename?: 'Blog'
    id: number
    title: string
    url: string
    kind: number
    tags: Array<{
      __typename?: 'Technology'
      id: number
      name: string
      tagColor: string
    }>
  }>
}

export type GetProjectsQueryVariables = Exact<Record<string, never>>

export type GetProjectsQuery = {
  __typename?: 'Query'
  projects: Array<{
    __typename?: 'Project'
    id: string
    title: string
    description: string
    isFavorite: boolean
    githubLink?: string | null
    qiitaLink?: string | null
    appLink?: string | null
    tags: Array<{
      __typename?: 'Technology'
      id: number
      name: string
      tagColor: string
    }>
  }>
}

export type GetTechStacksQueryVariables = Exact<Record<string, never>>

export type GetTechStacksQuery = {
  __typename?: 'Query'
  techStacks: Array<{
    __typename?: 'TechStack'
    id: number
    proficiency: number
    technology: {
      __typename?: 'Technology'
      id: number
      name: string
      tagColor: string
      logoUrl?: string | null
    }
  }>
}

export const GetBlogsDocument = gql`
  query getBlogs {
    blogs {
      id
      title
      url
      kind
      tags {
        id
        name
        tagColor
      }
    }
  }
`

export function useGetBlogsQuery(
  options?: Omit<Urql.UseQueryArgs<GetBlogsQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetBlogsQuery, GetBlogsQueryVariables>({
    query: GetBlogsDocument,
    ...options,
  })
}
export const GetProjectsDocument = gql`
  query getProjects {
    projects {
      id
      title
      description
      isFavorite
      githubLink
      qiitaLink
      appLink
      tags {
        id
        name
        tagColor
      }
    }
  }
`

export function useGetProjectsQuery(
  options?: Omit<Urql.UseQueryArgs<GetProjectsQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetProjectsQuery, GetProjectsQueryVariables>({
    query: GetProjectsDocument,
    ...options,
  })
}
export const GetTechStacksDocument = gql`
  query getTechStacks {
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
  }
`

export function useGetTechStacksQuery(
  options?: Omit<Urql.UseQueryArgs<GetTechStacksQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetTechStacksQuery, GetTechStacksQueryVariables>({
    query: GetTechStacksDocument,
    ...options,
  })
}
