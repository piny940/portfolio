export type Technology = {
  slug: string
  name: string
  tagColor: string
  logoUrl: string | null
  proficiency: number | null
}

export type ProjectLinks = {
  app: string | null
  github: string | null
  qiita: string | null
}

export type Project = {
  id: string
  title: string
  description: string
  isFavorite: boolean
  links: ProjectLinks
  tags: Technology[]
}

export type Blog = {
  title: string
  url: string
  publishedAt: string
  tags: Technology[]
}

export type Profile = {
  name: string
  handle: string
  description: string
  links: {
    github: string
    qiita: string
    x: string
  }
}
