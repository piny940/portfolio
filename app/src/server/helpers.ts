import { Blog, Project, TechStack } from '@/server/_types'

export const sortProjectsByFavorite = (projects: Project[]) => {
  const dup = [...projects]
  return dup.sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1
    if (!a.isFavorite && b.isFavorite) return 1
    return 0
  })
}
export const sortTechStacksByProficiency = (techStacks: TechStack[]) => {
  const dup = [...techStacks]
  return dup.sort((a, b) => {
    if (a.proficiency > b.proficiency) return -1
    if (a.proficiency < b.proficiency) return 1
    return 0
  })
}
export const sortBlogsByPublishedAt = (blogs: Blog[]) => {
  const dup = [...blogs]
  return dup.sort((a, b) => {
    const aDate = new Date(a.publishedAt)
    const bDate = new Date(b.publishedAt)
    if (aDate > bDate) return -1
    if (aDate < bDate) return 1
    return 0
  })
}
