export type Blog = {
  id: number
  title: string
  url: string
  kind: string
  publishedAt: string
  tags: Technology[]
}
export type BlogInput = {
  title: string
  url: string
  kind: string
  publishedAt: string
}
export type Technology = {
  id: number
  name: string
}
