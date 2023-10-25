import { Technologies } from './technology'

export interface BlogData {
  title: string
  link: string
  technologyIds: string[]
}

export type BlogsData = BlogData[]

export class Blog {
  #data: BlogData
  #allTechnologies: Technologies

  constructor(data: BlogData, allTechnologies: Technologies) {
    this.#data = data
    this.#allTechnologies = allTechnologies
  }

  getTitle = () => this.#data.title
  getLink = () => this.#data.link

  getTechnologies = () => {
    return this.#data.technologyIds.map((techId) =>
      this.#allTechnologies.findById(techId)
    )
  }
}

export class Blogs {
  #blogs: readonly Blog[] = []

  constructor(blogsData: BlogsData, allTechnologies: Technologies) {
    this.#blogs = blogsData.map((data) => new Blog(data, allTechnologies))
  }

  getBlogs = (count: number): readonly Blog[] =>
    count ? this.#blogs.slice(0, count) : this.#blogs

  sortedByDates = (count: number | undefined): readonly Blog[] => {
    const blogs = this.#blogs.slice().reverse()
    return count ? blogs.slice(0, count) : blogs
  }
}
