import { GraphQLClient, RequestOptions } from 'graphql-request'
import gql from 'graphql-tag'
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
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  Int64: { input: number; output: number }
  Time: { input: string; output: string }
  Uint: { input: number; output: number }
  Upload: { input: File; output: File }
}

export type Blog = {
  __typename?: 'Blog'
  createdAt: Scalars['Time']['output']
  id: Scalars['Uint']['output']
  kind: Scalars['Int']['output']
  publishedAt: Scalars['Time']['output']
  tags: BlogTag[]
  title: Scalars['String']['output']
  updatedAt: Scalars['Time']['output']
  url: Scalars['String']['output']
}

export type BlogConnection = {
  __typename?: 'BlogConnection'
  items: Blog[]
  totalCount: Scalars['Int64']['output']
}

export type BlogInput = {
  kind: Scalars['Int']['input']
  publishedAt: Scalars['Time']['input']
  title: Scalars['String']['input']
  url: Scalars['String']['input']
}

export type BlogTag = {
  __typename?: 'BlogTag'
  blogId: Scalars['Uint']['output']
  technology: Technology
}

export type ListOpt = {
  limit: Scalars['Int']['input']
  offset: Scalars['Int']['input']
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
  updateBlogTags: Array<Maybe<BlogTag>>
  updateProject: Project
  updateProjectOrder: Project[]
  updateProjectTags: ProjectTag[]
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

export type MutationUpdateProjectOrderArgs = {
  input: UpdateProjectOrderInput
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
  position: Scalars['Int']['output']
  qiitaLink?: Maybe<Scalars['String']['output']>
  tags: ProjectTag[]
  title: Scalars['String']['output']
  updatedAt: Scalars['Time']['output']
}

export type ProjectInput = {
  appLink?: InputMaybe<Scalars['String']['input']>
  description: Scalars['String']['input']
  githubLink?: InputMaybe<Scalars['String']['input']>
  id: Scalars['String']['input']
  isFavorite: Scalars['Boolean']['input']
  position?: InputMaybe<Scalars['Int']['input']>
  qiitaLink?: InputMaybe<Scalars['String']['input']>
  title: Scalars['String']['input']
}

export type ProjectTag = {
  __typename?: 'ProjectTag'
  projectId: Scalars['String']['output']
  technology: Technology
}

export type Query = {
  __typename?: 'Query'
  blog: Blog
  blogs: BlogConnection
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

export type QueryBlogsArgs = {
  opt?: InputMaybe<ListOpt>
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
  logo?: InputMaybe<Scalars['Upload']['input']>
  name: Scalars['String']['input']
  tagColor: Scalars['String']['input']
}

export type UpdateProjectOrderInput = {
  ids: Array<Scalars['String']['input']>
}

export type BlogFragment = {
  __typename?: 'Blog'
  id: number
  title: string
  url: string
  kind: number
  publishedAt: string
  createdAt: string
  updatedAt: string
}

export type ProjectFragment = {
  __typename?: 'Project'
  id: string
  title: string
  description: string
  isFavorite: boolean
  position: number
  appLink?: string | null
  githubLink?: string | null
  qiitaLink?: string | null
  createdAt: string
  updatedAt: string
}

export type TechnologyFragment = {
  __typename?: 'Technology'
  id: number
  name: string
  logoUrl?: string | null
  tagColor: string
  createdAt: string
  updatedAt: string
}

export type BlogTagFragment = {
  __typename?: 'BlogTag'
  blogId: number
  technology: {
    __typename?: 'Technology'
    id: number
    name: string
    logoUrl?: string | null
    tagColor: string
    createdAt: string
    updatedAt: string
  }
}

export type ProjectTagFragment = {
  __typename?: 'ProjectTag'
  projectId: string
  technology: {
    __typename?: 'Technology'
    id: number
    name: string
    logoUrl?: string | null
    tagColor: string
    createdAt: string
    updatedAt: string
  }
}

export type FetchAllDataQueryVariables = Exact<Record<string, never>>

export type FetchAllDataQuery = {
  __typename?: 'Query'
  blogs: {
    __typename?: 'BlogConnection'
    items: Array<{
      __typename?: 'Blog'
      id: number
      title: string
      url: string
      kind: number
      publishedAt: string
      createdAt: string
      updatedAt: string
      tags: Array<{
        __typename?: 'BlogTag'
        blogId: number
        technology: {
          __typename?: 'Technology'
          id: number
          name: string
          logoUrl?: string | null
          tagColor: string
          createdAt: string
          updatedAt: string
        }
      }>
    }>
  }
  projects: Array<{
    __typename?: 'Project'
    id: string
    title: string
    description: string
    isFavorite: boolean
    position: number
    appLink?: string | null
    githubLink?: string | null
    qiitaLink?: string | null
    createdAt: string
    updatedAt: string
    tags: Array<{
      __typename?: 'ProjectTag'
      projectId: string
      technology: {
        __typename?: 'Technology'
        id: number
        name: string
        logoUrl?: string | null
        tagColor: string
        createdAt: string
        updatedAt: string
      }
    }>
  }>
  techStacks: Array<{
    __typename?: 'TechStack'
    id: number
    technologyId: number
    proficiency: number
    createdAt: string
    updatedAt: string
    technology: {
      __typename?: 'Technology'
      id: number
      name: string
      logoUrl?: string | null
      tagColor: string
      createdAt: string
      updatedAt: string
    }
  }>
}

export type FetchBlogsQueryVariables = Exact<{
  opt?: InputMaybe<ListOpt>
}>

export type FetchBlogsQuery = {
  __typename?: 'Query'
  blogs: {
    __typename?: 'BlogConnection'
    totalCount: number
    items: Array<{
      __typename?: 'Blog'
      id: number
      title: string
      url: string
      kind: number
      publishedAt: string
      createdAt: string
      updatedAt: string
      tags: Array<{
        __typename?: 'BlogTag'
        blogId: number
        technology: {
          __typename?: 'Technology'
          id: number
          name: string
          logoUrl?: string | null
          tagColor: string
          createdAt: string
          updatedAt: string
        }
      }>
    }>
  }
}

export type FetchProjectsQueryVariables = Exact<Record<string, never>>

export type FetchProjectsQuery = {
  __typename?: 'Query'
  projects: Array<{
    __typename?: 'Project'
    id: string
    title: string
    description: string
    isFavorite: boolean
    position: number
    appLink?: string | null
    githubLink?: string | null
    qiitaLink?: string | null
    createdAt: string
    updatedAt: string
    tags: Array<{
      __typename?: 'ProjectTag'
      projectId: string
      technology: {
        __typename?: 'Technology'
        id: number
        name: string
        logoUrl?: string | null
        tagColor: string
        createdAt: string
        updatedAt: string
      }
    }>
  }>
}

export type FetchProjectQueryVariables = Exact<{
  id: Scalars['String']['input']
}>

export type FetchProjectQuery = {
  __typename?: 'Query'
  project: {
    __typename?: 'Project'
    id: string
    title: string
    description: string
    isFavorite: boolean
    position: number
    appLink?: string | null
    githubLink?: string | null
    qiitaLink?: string | null
    createdAt: string
    updatedAt: string
    tags: Array<{
      __typename?: 'ProjectTag'
      projectId: string
      technology: {
        __typename?: 'Technology'
        id: number
        name: string
        logoUrl?: string | null
        tagColor: string
        createdAt: string
        updatedAt: string
      }
    }>
  }
}

export type FetchTechStacksQueryVariables = Exact<Record<string, never>>

export type FetchTechStacksQuery = {
  __typename?: 'Query'
  techStacks: Array<{
    __typename?: 'TechStack'
    id: number
    technologyId: number
    proficiency: number
    createdAt: string
    updatedAt: string
    technology: {
      __typename?: 'Technology'
      id: number
      name: string
      logoUrl?: string | null
      tagColor: string
      createdAt: string
      updatedAt: string
    }
  }>
}

export type FetchTechnologyQueryVariables = Exact<{
  id: Scalars['Uint']['input']
}>

export type FetchTechnologyQuery = {
  __typename?: 'Query'
  projects: Array<{
    __typename?: 'Project'
    id: string
    title: string
    description: string
    isFavorite: boolean
    position: number
    appLink?: string | null
    githubLink?: string | null
    qiitaLink?: string | null
    createdAt: string
    updatedAt: string
    tags: Array<{
      __typename?: 'ProjectTag'
      projectId: string
      technology: {
        __typename?: 'Technology'
        id: number
        name: string
        logoUrl?: string | null
        tagColor: string
        createdAt: string
        updatedAt: string
      }
    }>
  }>
  blogs: {
    __typename?: 'BlogConnection'
    items: Array<{
      __typename?: 'Blog'
      id: number
      title: string
      url: string
      kind: number
      publishedAt: string
      createdAt: string
      updatedAt: string
      tags: Array<{
        __typename?: 'BlogTag'
        blogId: number
        technology: {
          __typename?: 'Technology'
          id: number
          name: string
          logoUrl?: string | null
          tagColor: string
          createdAt: string
          updatedAt: string
        }
      }>
    }>
  }
  technology: {
    __typename?: 'Technology'
    id: number
    name: string
    logoUrl?: string | null
    tagColor: string
    createdAt: string
    updatedAt: string
  }
}

export const BlogFragmentDoc = gql`
  fragment Blog on Blog {
    id
    title
    url
    kind
    publishedAt
    createdAt
    updatedAt
  }
`
export const ProjectFragmentDoc = gql`
  fragment Project on Project {
    id
    title
    description
    isFavorite
    position
    appLink
    githubLink
    qiitaLink
    createdAt
    updatedAt
  }
`
export const TechnologyFragmentDoc = gql`
  fragment Technology on Technology {
    id
    name
    logoUrl
    tagColor
    createdAt
    updatedAt
  }
`
export const BlogTagFragmentDoc = gql`
  fragment BlogTag on BlogTag {
    blogId
    technology {
      ...Technology
    }
  }
  ${TechnologyFragmentDoc}
`
export const ProjectTagFragmentDoc = gql`
  fragment ProjectTag on ProjectTag {
    projectId
    technology {
      ...Technology
    }
  }
  ${TechnologyFragmentDoc}
`
export const FetchAllDataDocument = gql`
  query fetchAllData {
    blogs {
      items {
        ...Blog
        tags {
          ...BlogTag
        }
      }
    }
    projects {
      ...Project
      tags {
        ...ProjectTag
      }
    }
    techStacks {
      id
      technologyId
      technology {
        ...Technology
      }
      proficiency
      createdAt
      updatedAt
    }
  }
  ${BlogFragmentDoc}
  ${BlogTagFragmentDoc}
  ${ProjectFragmentDoc}
  ${ProjectTagFragmentDoc}
  ${TechnologyFragmentDoc}
`
export const FetchBlogsDocument = gql`
  query fetchBlogs($opt: ListOpt) {
    blogs(opt: $opt) {
      items {
        ...Blog
        tags {
          ...BlogTag
        }
      }
      totalCount
    }
  }
  ${BlogFragmentDoc}
  ${BlogTagFragmentDoc}
`
export const FetchProjectsDocument = gql`
  query fetchProjects {
    projects {
      ...Project
      tags {
        ...ProjectTag
      }
    }
  }
  ${ProjectFragmentDoc}
  ${ProjectTagFragmentDoc}
`
export const FetchProjectDocument = gql`
  query fetchProject($id: String!) {
    project(id: $id) {
      ...Project
      tags {
        ...ProjectTag
      }
    }
  }
  ${ProjectFragmentDoc}
  ${ProjectTagFragmentDoc}
`
export const FetchTechStacksDocument = gql`
  query fetchTechStacks {
    techStacks {
      id
      technologyId
      technology {
        ...Technology
      }
      proficiency
      createdAt
      updatedAt
    }
  }
  ${TechnologyFragmentDoc}
`
export const FetchTechnologyDocument = gql`
  query fetchTechnology($id: Uint!) {
    projects {
      ...Project
      tags {
        ...ProjectTag
      }
    }
    blogs {
      items {
        ...Blog
        tags {
          ...BlogTag
        }
      }
    }
    technology(id: $id) {
      ...Technology
    }
  }
  ${ProjectFragmentDoc}
  ${ProjectTagFragmentDoc}
  ${BlogFragmentDoc}
  ${BlogTagFragmentDoc}
  ${TechnologyFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = async (
  action,
  _operationName,
  _operationType,
  _variables
) => await action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    async fetchAllData(
      variables?: FetchAllDataQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<FetchAllDataQuery> {
      return await withWrapper(
        async (wrappedRequestHeaders) =>
          await client.request<FetchAllDataQuery>(FetchAllDataDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'fetchAllData',
        'query',
        variables
      )
    },
    async fetchBlogs(
      variables?: FetchBlogsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<FetchBlogsQuery> {
      return await withWrapper(
        async (wrappedRequestHeaders) =>
          await client.request<FetchBlogsQuery>(FetchBlogsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'fetchBlogs',
        'query',
        variables
      )
    },
    async fetchProjects(
      variables?: FetchProjectsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<FetchProjectsQuery> {
      return await withWrapper(
        async (wrappedRequestHeaders) =>
          await client.request<FetchProjectsQuery>(FetchProjectsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'fetchProjects',
        'query',
        variables
      )
    },
    async fetchProject(
      variables: FetchProjectQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<FetchProjectQuery> {
      return await withWrapper(
        async (wrappedRequestHeaders) =>
          await client.request<FetchProjectQuery>(FetchProjectDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'fetchProject',
        'query',
        variables
      )
    },
    async fetchTechStacks(
      variables?: FetchTechStacksQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<FetchTechStacksQuery> {
      return await withWrapper(
        async (wrappedRequestHeaders) =>
          await client.request<FetchTechStacksQuery>(
            FetchTechStacksDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'fetchTechStacks',
        'query',
        variables
      )
    },
    async fetchTechnology(
      variables: FetchTechnologyQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<FetchTechnologyQuery> {
      return await withWrapper(
        async (wrappedRequestHeaders) =>
          await client.request<FetchTechnologyQuery>(
            FetchTechnologyDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'fetchTechnology',
        'query',
        variables
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
