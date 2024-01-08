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
  deleteBlog: Blog
  deleteProject: Project
  updateBlog: Blog
  updateProject: Project
}

export type MutationCreateBlogArgs = {
  input: BlogInput
}

export type MutationCreateProjectArgs = {
  input: ProjectInput
}

export type MutationDeleteBlogArgs = {
  id: Scalars['Uint']['input']
}

export type MutationDeleteProjectArgs = {
  id: Scalars['String']['input']
}

export type MutationUpdateBlogArgs = {
  id: Scalars['Uint']['input']
  input: BlogInput
}

export type MutationUpdateProjectArgs = {
  input: ProjectInput
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
}

export type QueryBlogArgs = {
  id: Scalars['Uint']['input']
}

export type QueryProjectArgs = {
  id: Scalars['String']['input']
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
