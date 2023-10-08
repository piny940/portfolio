import { ITechnologies } from './technology'

export interface ProjectData {
  title: string
  id: string
  description: string
  link?: string
  github?: string
  qiita?: string
  technologies: string[]
  isFavorite: boolean
  detailSrc: string
  detail: string
}
export type ProjectsData = ProjectData[]

export class Project {
  #data: ProjectData
  #technologies: ITechnologies

  constructor(data: ProjectData, technologies: ITechnologies) {
    this.#data = data
    this.#technologies = technologies
  }

  getTitle = () => this.#data.title
  getId = () => this.#data.id
  getDescription = () => this.#data.description
  getLink = () => this.#data.link
  getQiita = () => this.#data.qiita
  getTechnologies = () => {
    return this.#data.technologies.map((techId) =>
      this.#technologies.findById(techId)
    )
  }

  getGithub = () => this.#data.github

  getIsFavorite = () => this.#data.isFavorite
  getDetail = () => this.#data.detail
}

export class Projects {
  #projects: readonly Project[] = []

  constructor(projectsData: ProjectsData, technologies: ITechnologies) {
    this.#projects = projectsData.map((data) => new Project(data, technologies))
  }

  getProjects = () => this.#projects

  sortedByFavorite = () => {
    const notFavoriteProjects = this.#projects.filter(
      (project) => !project.getIsFavorite()
    )
    const favoriteProjects = this.#projects.filter((project) =>
      project.getIsFavorite()
    )
    return [...favoriteProjects, ...notFavoriteProjects]
  }
}
