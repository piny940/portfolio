export type Blog = {
  id: number
  title: string
  url: string
  kind: number
  publishedAt: string
  tags: Technology[]
}
export type QiitaTag = {
  name: string
}
export type QiitaBlog = {
  title: string
  url: string
  private: boolean
  tags: QiitaTag[]
  created_at: string
}
export type BlogInput = {
  title: string
  url: string
  kind: number
  publishedAt: string
}
export type Technology = {
  id: number
  name: string
}
