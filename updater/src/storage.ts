import { Blog, BlogInput, Technology } from './types'
import fs from 'fs'

const query = async (query: string, variables: any) => {
  let token = ''
  if (process.env.TOKEN_PATH) {
    token = fs.readFileSync(process.env.TOKEN_PATH).toString()
  }
  const response = await fetch(`${process.env.BACKEND_HOST || ''}/v1/query`, {
    body: JSON.stringify({ query, variables }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
  const json = await response.json()
  if (response.status !== 200) {
    throw new Error('error occurred in query: ' + JSON.stringify(json.errors))
  }
  return json
}
export const getBlogs = async () => {
  const { data } = await query(
    `query getBlogs {
    blogs {
      items {
        id
        title
        url
        kind
        publishedAt
        createdAt
        updatedAt
      }
    }
  }`,
    {}
  )
  return data.blogs.items as Blog[]
}
export const getTechnologies = async () => {
  const { data } = await query(
    `query getTechnologies {
    technologies {
      id
      name
      logoUrl
      tagColor
      createdAt
      updatedAt
    }
  }`,
    {}
  )
  return data.technologies as Technology[]
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
export const updateBlogTags = async (id: number, tags: number[]) => {
  const { data } = await query(
    `mutation updateBlogTags($id: Uint!, $tags: [Uint!]!) {
    updateBlogTags(id: $id, tags: $tags) {
      blogId
      technology {
        id
        name
        logoUrl
        tagColor
        createdAt
        updatedAt
      }
    }
  }`,
    { id, tags }
  )
  return data.updateBlogTags as Technology[]
}
