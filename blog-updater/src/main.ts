import { initConfig } from './config'
import { createBlog, getBlogs } from './graphql/query'
import { Blog, BlogInput } from './graphql/types'

initConfig()

const getQiitaBlogs = async () => {
  const response = await fetch(
    'https://qiita.com/api/v2/authenticated_user/items?per_page=100',
    {
      headers: {
        Authorization: `Bearer ${process.env.QIITA_API_TOKEN}`,
      },
    }
  )
  const json = await response.json()
  return json
}
const filterNewBlogs = (desiredBlogs: BlogInput[], currentBlogs: Blog[]) => {
  const currentBlogUrls = currentBlogs.map((blog) => blog.url)
  return desiredBlogs.filter((blog: any) => !currentBlogUrls.includes(blog.url))
}

const main = async () => {
  const qiitaBlogs = await getQiitaBlogs()
  const desiredBlogs: BlogInput[] = qiitaBlogs.map((blog: any) => ({
    kind: 0, // Qiita
    publishedAt: blog.created_at,
    title: blog.title,
    url: blog.url,
  }))
  const currentBlogs = await getBlogs()
  const newBlogs = filterNewBlogs(desiredBlogs, currentBlogs)
  const createdBlogs: Blog[] = []
  for (const blog of newBlogs) {
    const newBlog = await createBlog(blog)
    createdBlogs.push(newBlog)
  }
}

main()
