import { BlogsData } from '@/models/blogs'
import { gqlClient } from './common'
import { Blog, GetBlogsDocument } from '@/graphql/types'

export class BlogsLoader {
  async load(): Promise<BlogsData> {
    const {
      data: { blogs },
    } = await gqlClient.query(GetBlogsDocument, {}).toPromise()
    if (!blogs) throw new Error('Failed to load blogs')
    return blogs.map((blog: Blog) => ({
      title: blog.title,
      link: blog.url,
      technologyIds: blog.tags.map((tech) => tech.id.toString()),
    }))
  }
}
