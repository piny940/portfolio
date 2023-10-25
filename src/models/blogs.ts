export interface BlogData {
  title: string
  link: string
  technologyIds: string[]
}

export type BlogsData = BlogData[]

export class Blog {
  #data: BlogData

  constructor(data: BlogData) {
    this.#data = data
  }

  getTitle = () => this.#data.title
  getLink = () => this.#data.link
}

export class Blogs {
  #blogs: readonly Blog[] = []

  constructor(blogsData: BlogsData) {
    this.#blogs = blogsData.map((data) => new Blog(data))
  }

  getBlogs = () => this.#blogs
}
