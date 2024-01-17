export type Theme = 'dark' | 'light'

export type Technology = {
  id: number
  name: string
  tagColor: string
  logoUrl: string
}
export type Blog = {
  id: number
  title: string
  url: string
  tags: Technology[]
}
export type Project = {
  id: string
  title: string
  description: string
  isFavorite: boolean
  appLink?: string
  githubLink?: string
  qiitaLink?: string
  tags: Technology[]
}
export type TechStack = {
  id: number
  technology: Technology
  proficiency: number
}

export type Profile = {
  frontDescription: string
  qiita: string
  github: string
}
