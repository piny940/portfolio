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
  publishedAt: Scalars['Time']['output']
  tags: Array<Technology>
  title: Scalars['String']['output']
  updatedAt: Scalars['Time']['output']
  url: Scalars['String']['output']
}

export type BlogInput = {
  kind: Scalars['Int']['input']
  publishedAt: Scalars['Time']['input']
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
  updateProjectTags: Array<Technology>
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
  tags: Array<Technology>
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
  blogs: Array<Blog>
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

export type GetBlogsQueryVariables = Exact<{ [key: string]: never }>

export type GetBlogsQuery = {
  __typename?: 'Query'
  blogs: Array<{
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
