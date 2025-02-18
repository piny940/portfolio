import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
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
  tags: Array<BlogTag>
  title: Scalars['String']['output']
  updatedAt: Scalars['Time']['output']
  url: Scalars['String']['output']
}

export type BlogConnection = {
  __typename?: 'BlogConnection'
  items: Array<Blog>
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
  updateProjectOrder: Array<Project>
  updateProjectTags: Array<ProjectTag>
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
  tags: Array<ProjectTag>
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
  projects: Array<Project>
  techStack: TechStack
  techStacks: Array<TechStack>
  technologies: Array<Technology>
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

export type GetAllQueryVariables = Exact<{ [key: string]: never }>

export type GetAllQuery = {
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
        technology: { __typename?: 'Technology'; id: number; name: string }
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
    githubLink?: string | null
    qiitaLink?: string | null
    appLink?: string | null
    createdAt: string
    updatedAt: string
    tags: Array<{
      __typename?: 'ProjectTag'
      projectId: string
      technology: { __typename?: 'Technology'; id: number; name: string }
    }>
  }>
  technologies: Array<{
    __typename?: 'Technology'
    id: number
    name: string
    logoUrl?: string | null
    tagColor: string
    createdAt: string
    updatedAt: string
  }>
  techStacks: Array<{
    __typename?: 'TechStack'
    id: number
    proficiency: number
    technologyId: number
    createdAt: string
    updatedAt: string
    technology: { __typename?: 'Technology'; id: number; name: string }
  }>
}

export type GetMeQueryVariables = Exact<{ [key: string]: never }>

export type GetMeQuery = { __typename?: 'Query'; me?: string | null }

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

export type GetBlogsQueryVariables = Exact<{
  opt?: InputMaybe<ListOpt>
}>

export type GetBlogsQuery = {
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
    }>
  }
}

export type GetBlogQueryVariables = Exact<{
  id: Scalars['Uint']['input']
}>

export type GetBlogQuery = {
  __typename?: 'Query'
  blog: {
    __typename?: 'Blog'
    id: number
    title: string
    url: string
    kind: number
    publishedAt: string
    createdAt: string
    updatedAt: string
  }
}

export type GetBlogWithTagsQueryVariables = Exact<{
  id: Scalars['Uint']['input']
}>

export type GetBlogWithTagsQuery = {
  __typename?: 'Query'
  blog: {
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
  }
}

export type CreateBlogMutationVariables = Exact<{
  input: BlogInput
}>

export type CreateBlogMutation = {
  __typename?: 'Mutation'
  createBlog: {
    __typename?: 'Blog'
    id: number
    title: string
    url: string
    kind: number
    publishedAt: string
    createdAt: string
    updatedAt: string
  }
}

export type UpdateBlogWithTagsMutationVariables = Exact<{
  id: Scalars['Uint']['input']
  input: BlogInput
  tags: Array<Scalars['Uint']['input']> | Scalars['Uint']['input']
}>

export type UpdateBlogWithTagsMutation = {
  __typename?: 'Mutation'
  updateBlog: {
    __typename?: 'Blog'
    id: number
    title: string
    url: string
    kind: number
    publishedAt: string
    createdAt: string
    updatedAt: string
  }
  updateBlogTags: Array<{
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
  } | null>
}

export type DeleteBlogMutationVariables = Exact<{
  id: Scalars['Uint']['input']
}>

export type DeleteBlogMutation = {
  __typename?: 'Mutation'
  deleteBlog: {
    __typename?: 'Blog'
    id: number
    title: string
    url: string
    kind: number
    publishedAt: string
    createdAt: string
    updatedAt: string
  }
}

export type UpdateBlogTagsMutationVariables = Exact<{
  id: Scalars['Uint']['input']
  tags: Array<Scalars['Uint']['input']> | Scalars['Uint']['input']
}>

export type UpdateBlogTagsMutation = {
  __typename?: 'Mutation'
  updateBlogTags: Array<{
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
  } | null>
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

export type GetProjectsQueryVariables = Exact<{ [key: string]: never }>

export type GetProjectsQuery = {
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
  }>
}

export type GetProjectQueryVariables = Exact<{
  id: Scalars['String']['input']
}>

export type GetProjectQuery = {
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
  }
}

export type GetProjectWithTagsQueryVariables = Exact<{
  id: Scalars['String']['input']
}>

export type GetProjectWithTagsQuery = {
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

export type CreateProjectMutationVariables = Exact<{
  input: ProjectInput
}>

export type CreateProjectMutation = {
  __typename?: 'Mutation'
  createProject: {
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
}

export type UpdateProjectMutationVariables = Exact<{
  input: ProjectInput
}>

export type UpdateProjectMutation = {
  __typename?: 'Mutation'
  updateProject: {
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
}

export type UpdateProjectWithTagsMutationVariables = Exact<{
  id: Scalars['String']['input']
  input: ProjectInput
  tags: Array<Scalars['Uint']['input']> | Scalars['Uint']['input']
}>

export type UpdateProjectWithTagsMutation = {
  __typename?: 'Mutation'
  updateProject: {
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
  updateProjectTags: Array<{
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

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['String']['input']
}>

export type DeleteProjectMutation = {
  __typename?: 'Mutation'
  deleteProject: {
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
}

export type UpdateProjectTagsMutationVariables = Exact<{
  id: Scalars['String']['input']
  tags: Array<Scalars['Uint']['input']> | Scalars['Uint']['input']
}>

export type UpdateProjectTagsMutation = {
  __typename?: 'Mutation'
  updateProjectTags: Array<{
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

export type UpdateProjectOrderMutationVariables = Exact<{
  input: UpdateProjectOrderInput
}>

export type UpdateProjectOrderMutation = {
  __typename?: 'Mutation'
  updateProjectOrder: Array<{
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
  }>
}

export type TechStackFragment = {
  __typename?: 'TechStack'
  id: number
  technologyId: number
  proficiency: number
  createdAt: string
  updatedAt: string
}

export type GetTechStacksQueryVariables = Exact<{ [key: string]: never }>

export type GetTechStacksQuery = {
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
    }
  }>
}

export type GetTechStackQueryVariables = Exact<{
  id: Scalars['Uint']['input']
}>

export type GetTechStackQuery = {
  __typename?: 'Query'
  techStack: {
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
    }
  }
}

export type CreateTechStackMutationVariables = Exact<{
  input: TechStackInput
}>

export type CreateTechStackMutation = {
  __typename?: 'Mutation'
  createTechStack: {
    __typename?: 'TechStack'
    id: number
    technologyId: number
    proficiency: number
    createdAt: string
    updatedAt: string
  }
}

export type UpdateTechStackMutationVariables = Exact<{
  id: Scalars['Uint']['input']
  input: TechStackInput
}>

export type UpdateTechStackMutation = {
  __typename?: 'Mutation'
  updateTechStack: {
    __typename?: 'TechStack'
    id: number
    technologyId: number
    proficiency: number
    createdAt: string
    updatedAt: string
  }
}

export type DeleteTechStackMutationVariables = Exact<{
  id: Scalars['Uint']['input']
}>

export type DeleteTechStackMutation = {
  __typename?: 'Mutation'
  deleteTechStack: {
    __typename?: 'TechStack'
    id: number
    technologyId: number
    proficiency: number
    createdAt: string
    updatedAt: string
  }
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

export type GetTechnologiesQueryVariables = Exact<{ [key: string]: never }>

export type GetTechnologiesQuery = {
  __typename?: 'Query'
  technologies: Array<{
    __typename?: 'Technology'
    id: number
    name: string
    logoUrl?: string | null
    tagColor: string
    createdAt: string
    updatedAt: string
  }>
}

export type GetTechnologyQueryVariables = Exact<{
  id: Scalars['Uint']['input']
}>

export type GetTechnologyQuery = {
  __typename?: 'Query'
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

export type CreateTechnologyMutationVariables = Exact<{
  input: TechnologyInput
}>

export type CreateTechnologyMutation = {
  __typename?: 'Mutation'
  createTechnology: {
    __typename?: 'Technology'
    id: number
    name: string
    logoUrl?: string | null
    tagColor: string
    createdAt: string
    updatedAt: string
  }
}

export type UpdateTechnologyMutationVariables = Exact<{
  id: Scalars['Uint']['input']
  input: TechnologyInput
}>

export type UpdateTechnologyMutation = {
  __typename?: 'Mutation'
  updateTechnology: {
    __typename?: 'Technology'
    id: number
    name: string
    logoUrl?: string | null
    tagColor: string
    createdAt: string
    updatedAt: string
  }
}

export type DeleteTechnologyMutationVariables = Exact<{
  id: Scalars['Uint']['input']
}>

export type DeleteTechnologyMutation = {
  __typename?: 'Mutation'
  deleteTechnology: {
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
export const ProjectTagFragmentDoc = gql`
  fragment ProjectTag on ProjectTag {
    projectId
    technology {
      ...Technology
    }
  }
  ${TechnologyFragmentDoc}
`
export const TechStackFragmentDoc = gql`
  fragment TechStack on TechStack {
    id
    technologyId
    proficiency
    createdAt
    updatedAt
  }
`
export const GetAllDocument = gql`
  query getAll {
    blogs {
      items {
        ...Blog
        tags {
          blogId
          technology {
            id
            name
          }
        }
      }
      totalCount
    }
    projects {
      id
      title
      description
      isFavorite
      position
      githubLink
      qiitaLink
      appLink
      createdAt
      updatedAt
      tags {
        projectId
        technology {
          id
          name
        }
      }
    }
    technologies {
      id
      name
      logoUrl
      tagColor
      createdAt
      updatedAt
    }
    techStacks {
      id
      proficiency
      technologyId
      createdAt
      updatedAt
      technology {
        id
        name
      }
    }
  }
  ${BlogFragmentDoc}
`

export function useGetAllQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetAllQuery, GetAllQueryVariables>({
    query: GetAllDocument,
    ...options,
  })
}
export const GetMeDocument = gql`
  query getMe {
    me
  }
`

export function useGetMeQuery(
  options?: Omit<Urql.UseQueryArgs<GetMeQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetMeQuery, GetMeQueryVariables>({
    query: GetMeDocument,
    ...options,
  })
}
export const GetBlogsDocument = gql`
  query getBlogs($opt: ListOpt) {
    blogs(opt: $opt) {
      items {
        ...Blog
      }
      totalCount
    }
  }
  ${BlogFragmentDoc}
`

export function useGetBlogsQuery(
  options?: Omit<Urql.UseQueryArgs<GetBlogsQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetBlogsQuery, GetBlogsQueryVariables>({
    query: GetBlogsDocument,
    ...options,
  })
}
export const GetBlogDocument = gql`
  query getBlog($id: Uint!) {
    blog(id: $id) {
      ...Blog
    }
  }
  ${BlogFragmentDoc}
`

export function useGetBlogQuery(
  options: Omit<Urql.UseQueryArgs<GetBlogQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetBlogQuery, GetBlogQueryVariables>({
    query: GetBlogDocument,
    ...options,
  })
}
export const GetBlogWithTagsDocument = gql`
  query getBlogWithTags($id: Uint!) {
    blog(id: $id) {
      ...Blog
      tags {
        ...BlogTag
      }
    }
  }
  ${BlogFragmentDoc}
  ${BlogTagFragmentDoc}
`

export function useGetBlogWithTagsQuery(
  options: Omit<Urql.UseQueryArgs<GetBlogWithTagsQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetBlogWithTagsQuery, GetBlogWithTagsQueryVariables>({
    query: GetBlogWithTagsDocument,
    ...options,
  })
}
export const CreateBlogDocument = gql`
  mutation createBlog($input: BlogInput!) {
    createBlog(input: $input) {
      ...Blog
    }
  }
  ${BlogFragmentDoc}
`

export function useCreateBlogMutation() {
  return Urql.useMutation<CreateBlogMutation, CreateBlogMutationVariables>(
    CreateBlogDocument
  )
}
export const UpdateBlogWithTagsDocument = gql`
  mutation updateBlogWithTags($id: Uint!, $input: BlogInput!, $tags: [Uint!]!) {
    updateBlog(id: $id, input: $input) {
      ...Blog
    }
    updateBlogTags(id: $id, tags: $tags) {
      ...BlogTag
    }
  }
  ${BlogFragmentDoc}
  ${BlogTagFragmentDoc}
`

export function useUpdateBlogWithTagsMutation() {
  return Urql.useMutation<
    UpdateBlogWithTagsMutation,
    UpdateBlogWithTagsMutationVariables
  >(UpdateBlogWithTagsDocument)
}
export const DeleteBlogDocument = gql`
  mutation deleteBlog($id: Uint!) {
    deleteBlog(id: $id) {
      ...Blog
    }
  }
  ${BlogFragmentDoc}
`

export function useDeleteBlogMutation() {
  return Urql.useMutation<DeleteBlogMutation, DeleteBlogMutationVariables>(
    DeleteBlogDocument
  )
}
export const UpdateBlogTagsDocument = gql`
  mutation updateBlogTags($id: Uint!, $tags: [Uint!]!) {
    updateBlogTags(id: $id, tags: $tags) {
      ...BlogTag
    }
  }
  ${BlogTagFragmentDoc}
`

export function useUpdateBlogTagsMutation() {
  return Urql.useMutation<
    UpdateBlogTagsMutation,
    UpdateBlogTagsMutationVariables
  >(UpdateBlogTagsDocument)
}
export const GetProjectsDocument = gql`
  query getProjects {
    projects {
      ...Project
    }
  }
  ${ProjectFragmentDoc}
`

export function useGetProjectsQuery(
  options?: Omit<Urql.UseQueryArgs<GetProjectsQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetProjectsQuery, GetProjectsQueryVariables>({
    query: GetProjectsDocument,
    ...options,
  })
}
export const GetProjectDocument = gql`
  query getProject($id: String!) {
    project(id: $id) {
      ...Project
    }
  }
  ${ProjectFragmentDoc}
`

export function useGetProjectQuery(
  options: Omit<Urql.UseQueryArgs<GetProjectQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetProjectQuery, GetProjectQueryVariables>({
    query: GetProjectDocument,
    ...options,
  })
}
export const GetProjectWithTagsDocument = gql`
  query getProjectWithTags($id: String!) {
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

export function useGetProjectWithTagsQuery(
  options: Omit<Urql.UseQueryArgs<GetProjectWithTagsQueryVariables>, 'query'>
) {
  return Urql.useQuery<
    GetProjectWithTagsQuery,
    GetProjectWithTagsQueryVariables
  >({ query: GetProjectWithTagsDocument, ...options })
}
export const CreateProjectDocument = gql`
  mutation createProject($input: ProjectInput!) {
    createProject(input: $input) {
      ...Project
    }
  }
  ${ProjectFragmentDoc}
`

export function useCreateProjectMutation() {
  return Urql.useMutation<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >(CreateProjectDocument)
}
export const UpdateProjectDocument = gql`
  mutation updateProject($input: ProjectInput!) {
    updateProject(input: $input) {
      ...Project
    }
  }
  ${ProjectFragmentDoc}
`

export function useUpdateProjectMutation() {
  return Urql.useMutation<
    UpdateProjectMutation,
    UpdateProjectMutationVariables
  >(UpdateProjectDocument)
}
export const UpdateProjectWithTagsDocument = gql`
  mutation updateProjectWithTags(
    $id: String!
    $input: ProjectInput!
    $tags: [Uint!]!
  ) {
    updateProject(input: $input) {
      ...Project
    }
    updateProjectTags(id: $id, tags: $tags) {
      ...ProjectTag
    }
  }
  ${ProjectFragmentDoc}
  ${ProjectTagFragmentDoc}
`

export function useUpdateProjectWithTagsMutation() {
  return Urql.useMutation<
    UpdateProjectWithTagsMutation,
    UpdateProjectWithTagsMutationVariables
  >(UpdateProjectWithTagsDocument)
}
export const DeleteProjectDocument = gql`
  mutation deleteProject($id: String!) {
    deleteProject(id: $id) {
      ...Project
    }
  }
  ${ProjectFragmentDoc}
`

export function useDeleteProjectMutation() {
  return Urql.useMutation<
    DeleteProjectMutation,
    DeleteProjectMutationVariables
  >(DeleteProjectDocument)
}
export const UpdateProjectTagsDocument = gql`
  mutation updateProjectTags($id: String!, $tags: [Uint!]!) {
    updateProjectTags(id: $id, tags: $tags) {
      ...ProjectTag
    }
  }
  ${ProjectTagFragmentDoc}
`

export function useUpdateProjectTagsMutation() {
  return Urql.useMutation<
    UpdateProjectTagsMutation,
    UpdateProjectTagsMutationVariables
  >(UpdateProjectTagsDocument)
}
export const UpdateProjectOrderDocument = gql`
  mutation updateProjectOrder($input: UpdateProjectOrderInput!) {
    updateProjectOrder(input: $input) {
      ...Project
    }
  }
  ${ProjectFragmentDoc}
`

export function useUpdateProjectOrderMutation() {
  return Urql.useMutation<
    UpdateProjectOrderMutation,
    UpdateProjectOrderMutationVariables
  >(UpdateProjectOrderDocument)
}
export const GetTechStacksDocument = gql`
  query getTechStacks {
    techStacks {
      ...TechStack
      technology {
        id
        name
        logoUrl
      }
    }
  }
  ${TechStackFragmentDoc}
`

export function useGetTechStacksQuery(
  options?: Omit<Urql.UseQueryArgs<GetTechStacksQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetTechStacksQuery, GetTechStacksQueryVariables>({
    query: GetTechStacksDocument,
    ...options,
  })
}
export const GetTechStackDocument = gql`
  query getTechStack($id: Uint!) {
    techStack(id: $id) {
      ...TechStack
      technology {
        id
        name
        logoUrl
      }
    }
  }
  ${TechStackFragmentDoc}
`

export function useGetTechStackQuery(
  options: Omit<Urql.UseQueryArgs<GetTechStackQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetTechStackQuery, GetTechStackQueryVariables>({
    query: GetTechStackDocument,
    ...options,
  })
}
export const CreateTechStackDocument = gql`
  mutation createTechStack($input: TechStackInput!) {
    createTechStack(input: $input) {
      ...TechStack
    }
  }
  ${TechStackFragmentDoc}
`

export function useCreateTechStackMutation() {
  return Urql.useMutation<
    CreateTechStackMutation,
    CreateTechStackMutationVariables
  >(CreateTechStackDocument)
}
export const UpdateTechStackDocument = gql`
  mutation updateTechStack($id: Uint!, $input: TechStackInput!) {
    updateTechStack(id: $id, input: $input) {
      ...TechStack
    }
  }
  ${TechStackFragmentDoc}
`

export function useUpdateTechStackMutation() {
  return Urql.useMutation<
    UpdateTechStackMutation,
    UpdateTechStackMutationVariables
  >(UpdateTechStackDocument)
}
export const DeleteTechStackDocument = gql`
  mutation deleteTechStack($id: Uint!) {
    deleteTechStack(id: $id) {
      ...TechStack
    }
  }
  ${TechStackFragmentDoc}
`

export function useDeleteTechStackMutation() {
  return Urql.useMutation<
    DeleteTechStackMutation,
    DeleteTechStackMutationVariables
  >(DeleteTechStackDocument)
}
export const GetTechnologiesDocument = gql`
  query getTechnologies {
    technologies {
      ...Technology
    }
  }
  ${TechnologyFragmentDoc}
`

export function useGetTechnologiesQuery(
  options?: Omit<Urql.UseQueryArgs<GetTechnologiesQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetTechnologiesQuery, GetTechnologiesQueryVariables>({
    query: GetTechnologiesDocument,
    ...options,
  })
}
export const GetTechnologyDocument = gql`
  query getTechnology($id: Uint!) {
    technology(id: $id) {
      ...Technology
    }
  }
  ${TechnologyFragmentDoc}
`

export function useGetTechnologyQuery(
  options: Omit<Urql.UseQueryArgs<GetTechnologyQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetTechnologyQuery, GetTechnologyQueryVariables>({
    query: GetTechnologyDocument,
    ...options,
  })
}
export const CreateTechnologyDocument = gql`
  mutation createTechnology($input: TechnologyInput!) {
    createTechnology(input: $input) {
      ...Technology
    }
  }
  ${TechnologyFragmentDoc}
`

export function useCreateTechnologyMutation() {
  return Urql.useMutation<
    CreateTechnologyMutation,
    CreateTechnologyMutationVariables
  >(CreateTechnologyDocument)
}
export const UpdateTechnologyDocument = gql`
  mutation updateTechnology($id: Uint!, $input: TechnologyInput!) {
    updateTechnology(id: $id, input: $input) {
      ...Technology
    }
  }
  ${TechnologyFragmentDoc}
`

export function useUpdateTechnologyMutation() {
  return Urql.useMutation<
    UpdateTechnologyMutation,
    UpdateTechnologyMutationVariables
  >(UpdateTechnologyDocument)
}
export const DeleteTechnologyDocument = gql`
  mutation deleteTechnology($id: Uint!) {
    deleteTechnology(id: $id) {
      ...Technology
    }
  }
  ${TechnologyFragmentDoc}
`

export function useDeleteTechnologyMutation() {
  return Urql.useMutation<
    DeleteTechnologyMutation,
    DeleteTechnologyMutationVariables
  >(DeleteTechnologyDocument)
}
