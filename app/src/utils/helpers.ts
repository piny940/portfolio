import { Project, TechStack } from '@/resources/types'

export const toClass = (...args: string[]) => {
  return args.join(' ')
}

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
