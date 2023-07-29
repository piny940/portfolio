import { skill } from './enums'

export type Theme = 'dark' | 'light'

export type SkillType = {
  name: string
  percent: number
  logoSrc?: string
}
export type ProjectType = {
  title: string
  id: string
  description: string
  link?: string
  github?: string
  imageSrc?: string
  detailSrc: string
  skills: skill[]
}
