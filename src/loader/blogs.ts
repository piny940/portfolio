import { BlogsData } from '@/models/blogs'
import { IYamlLoader } from './_common'

export class BlogsLoader {
  #BLOGS_DATA_PATH = 'src/data/blogs.yml'
  #loader

  constructor(loader: IYamlLoader) {
    this.#loader = loader
  }

  load() {
    return this.#loader.load<BlogsData>(this.#BLOGS_DATA_PATH)
  }
}
