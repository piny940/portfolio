import { Technologies } from './technology'

export interface BlogData {
  title: string
  link: string
  technologyIds: string[]
}

export type BlogsData = BlogData[]

export class Blog {
  constructor(
    private readonly data: BlogData,
    private readonly allTechnologies: Technologies
  ) {}

  getTitle = () => this.data.title
  getLink = () => this.data.link
  getTechnologies = () => {
    return this.data.technologyIds.map((techId) =>
      this.allTechnologies.findById(techId)
    )
  }
}

export class Blogs {
  #blogs: readonly Blog[] = []

  constructor(blogsData: BlogsData, allTechnologies: Technologies) {
    this.#blogs = blogsData.map((data) => new Blog(data, allTechnologies))
  }

  getBlogs = () => this.#blogs
}
