import { BlogsData } from '@/models/blogs'

export class BlogsLoader {
  async load(): Promise<BlogsData> {
    return [] as BlogsData
  }
}
