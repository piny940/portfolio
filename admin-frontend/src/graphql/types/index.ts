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
  Time: { input: string; output: string }
  Uint: { input: number; output: number }
}

export type Blog = {
  __typename?: 'Blog'
  createdAt: Scalars['Time']['output']
  id: Scalars['Uint']['output']
  kind: Scalars['Int']['output']
  tags: Array<Technology>
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
  createTechnology: Technology
  deleteBlog: Blog
  deleteProject: Project
  deleteTechnology: Technology
  updateBlog: Blog
  updateBlogTags: Array<Maybe<Technology>>
  updateProject: Project
  updateTechnology: Technology
}

export type MutationCreateBlogArgs = {
  input: BlogInput
}

export type MutationCreateProjectArgs = {
  input: ProjectInput
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

export type MutationUpdateTechnologyArgs = {
  id: Scalars['Uint']['input']
  input: TechnologyInput
}

export type Project = {
  __typename?: 'Project'
  createdAt: Scalars['Time']['output']
  description: Scalars['String']['output']
  id: Scalars['String']['output']
  isFavorite: Scalars['Boolean']['output']
  title: Scalars['String']['output']
  updatedAt: Scalars['Time']['output']
}

export type ProjectInput = {
  description: Scalars['String']['input']
  id: Scalars['String']['input']
  isFavorite: Scalars['Boolean']['input']
  title: Scalars['String']['input']
}

export type Query = {
  __typename?: 'Query'
  blog: Blog
  blogs: Array<Blog>
  project: Project
  projects: Array<Project>
  technologies: Array<Technology>
  technology: Technology
}

export type QueryBlogArgs = {
  id: Scalars['Uint']['input']
}

export type QueryProjectArgs = {
  id: Scalars['String']['input']
}

export type QueryTechnologyArgs = {
  id: Scalars['Uint']['input']
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

export type GetBlogsQueryVariables = Exact<{ [key: string]: never }>

export type GetBlogsQuery = {
  __typename?: 'Query'
  blogs: Array<{
    __typename?: 'Blog'
    id: number
    title: string
    url: string
    kind: number
    createdAt: string
    updatedAt: string
  }>
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
    createdAt: string
    updatedAt: string
    tags: Array<{
      __typename?: 'Technology'
      id: number
      name: string
      logoUrl?: string | null
      tagColor: string
      createdAt: string
      updatedAt: string
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
    createdAt: string
    updatedAt: string
  }
  updateBlogTags: Array<{
    __typename?: 'Technology'
    id: number
    name: string
    logoUrl?: string | null
    tagColor: string
    createdAt: string
    updatedAt: string
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
    __typename?: 'Technology'
    id: number
    name: string
    logoUrl?: string | null
    tagColor: string
    createdAt: string
    updatedAt: string
  } | null>
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
    createdAt: string
    updatedAt: string
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
    createdAt: string
    updatedAt: string
  }
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
    createdAt: string
    updatedAt: string
  }
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

export const GetBlogsDocument = gql`
  query getBlogs {
    blogs {
      id
      title
      url
      kind
      createdAt
      updatedAt
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
export const GetBlogDocument = gql`
  query getBlog($id: Uint!) {
    blog(id: $id) {
      id
      title
      url
      kind
      createdAt
      updatedAt
    }
  }
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
      id
      title
      url
      kind
      createdAt
      updatedAt
      tags {
        id
        name
        logoUrl
        tagColor
        createdAt
        updatedAt
      }
    }
  }
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
      id
      title
      url
      kind
      createdAt
      updatedAt
    }
  }
`

export function useCreateBlogMutation() {
  return Urql.useMutation<CreateBlogMutation, CreateBlogMutationVariables>(
    CreateBlogDocument
  )
}
export const UpdateBlogWithTagsDocument = gql`
  mutation updateBlogWithTags($id: Uint!, $input: BlogInput!, $tags: [Uint!]!) {
    updateBlog(id: $id, input: $input) {
      id
      title
      url
      kind
      createdAt
      updatedAt
    }
    updateBlogTags(id: $id, tags: $tags) {
      id
      name
      logoUrl
      tagColor
      createdAt
      updatedAt
    }
  }
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
      id
      title
      url
      kind
      createdAt
      updatedAt
    }
  }
`

export function useDeleteBlogMutation() {
  return Urql.useMutation<DeleteBlogMutation, DeleteBlogMutationVariables>(
    DeleteBlogDocument
  )
}
export const UpdateBlogTagsDocument = gql`
  mutation updateBlogTags($id: Uint!, $tags: [Uint!]!) {
    updateBlogTags(id: $id, tags: $tags) {
      id
      name
      logoUrl
      tagColor
      createdAt
      updatedAt
    }
  }
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
      id
      title
      description
      isFavorite
      createdAt
      updatedAt
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
export const GetProjectDocument = gql`
  query getProject($id: String!) {
    project(id: $id) {
      id
      title
      description
      isFavorite
      createdAt
      updatedAt
    }
  }
`

export function useGetProjectQuery(
  options: Omit<Urql.UseQueryArgs<GetProjectQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetProjectQuery, GetProjectQueryVariables>({
    query: GetProjectDocument,
    ...options,
  })
}
export const CreateProjectDocument = gql`
  mutation createProject($input: ProjectInput!) {
    createProject(input: $input) {
      id
      title
      description
      isFavorite
      createdAt
      updatedAt
    }
  }
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
      id
      title
      description
      isFavorite
      createdAt
      updatedAt
    }
  }
`

export function useUpdateProjectMutation() {
  return Urql.useMutation<
    UpdateProjectMutation,
    UpdateProjectMutationVariables
  >(UpdateProjectDocument)
}
export const DeleteProjectDocument = gql`
  mutation deleteProject($id: String!) {
    deleteProject(id: $id) {
      id
      title
      description
      isFavorite
      createdAt
      updatedAt
    }
  }
`

export function useDeleteProjectMutation() {
  return Urql.useMutation<
    DeleteProjectMutation,
    DeleteProjectMutationVariables
  >(DeleteProjectDocument)
}
export const GetTechnologiesDocument = gql`
  query getTechnologies {
    technologies {
      id
      name
      logoUrl
      tagColor
      createdAt
      updatedAt
    }
  }
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
      id
      name
      logoUrl
      tagColor
      createdAt
      updatedAt
    }
  }
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
      id
      name
      logoUrl
      tagColor
      createdAt
      updatedAt
    }
  }
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
      id
      name
      logoUrl
      tagColor
      createdAt
      updatedAt
    }
  }
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
      id
      name
      logoUrl
      tagColor
      createdAt
      updatedAt
    }
  }
`

export function useDeleteTechnologyMutation() {
  return Urql.useMutation<
    DeleteTechnologyMutation,
    DeleteTechnologyMutationVariables
  >(DeleteTechnologyDocument)
}
