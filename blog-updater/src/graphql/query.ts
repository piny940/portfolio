import { Blog, BlogInput } from './types'

const query = async (query: string, variables: any) => {
  const response = await fetch(`${process.env.BACKEND_HOST || ''}/v1/query`, {
    body: JSON.stringify({ query, variables }),
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_TOKEN || ''}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
  const json = await response.json()
  if (response.status !== 200) {
    throw new Error(
      'error occurred in query: ' + JSON.stringify(json.errors)
    )
  }
  return json
}
export const getBlogs = async () => {
  const { data } = await query(
    `query getBlogs {
    blogs {
      id
      title
      url
      kind
      publishedAt
      createdAt
      updatedAt
    }
  }`,
    {}
  )
  return data.blogs as Blog[]
}
export const createBlog = async (input: BlogInput) => {
  const { data } = await query(
    `mutation createBlog($input: BlogInput!) {
    createBlog(input: $input) {
      id
      title
      url
      kind
      publishedAt
      createdAt
      updatedAt
    }
  }`,
    { input }
  )
  return data.createBlog as Blog
}
