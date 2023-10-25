import { ITechnologies } from './technology'

export interface ProjectData {
  title: string
  id: string
  description: string
  link?: string
  github?: string
  qiita?: string
  technologyIds: string[]
  isFavorite: boolean
  detailSrc: string
  detail: string
}
export type ProjectsData = ProjectData[]

export class Project {
  #data: ProjectData
  #allTechnologies: ITechnologies

  constructor(data: ProjectData, allTechnologies: ITechnologies) {
    this.#data = data
    this.#allTechnologies = allTechnologies
  }

  getTitle = () => this.#data.title
  getId = () => this.#data.id
  getDescription = () => this.#data.description
  getLink = () => this.#data.link
  getQiita = () => this.#data.qiita
  getTechnologies = () => {
    return this.#data.technologyIds.map((techId) =>
      this.#allTechnologies.findById(techId)
    )
  }

  getGithub = () => this.#data.github

  getIsFavorite = () => this.#data.isFavorite
  getDetail = () => this.#data.detail
  toData = () => this.#data
}

export class Projects {
  #projects: readonly Project[] = []

  constructor(
    projectsData: ProjectsData,
    private readonly allTechnologies: ITechnologies
  ) {
    this.#projects = projectsData.map(
      (data) => new Project(data, allTechnologies)
    )
  }

  getProjects = (limit?: number) => this.#projects.slice(0, limit)

  sortedByFavorite = (limit?: number) => {
    const notFavoriteProjects = this.#projects.filter(
      (project) => !project.getIsFavorite()
    )
    const favoriteProjects = this.#projects.filter((project) =>
      project.getIsFavorite()
    )
    return [...favoriteProjects, ...notFavoriteProjects].slice(0, limit)
  }

  filterByTechnology = (techId: string) => {
    const filteredProjects = this.#projects.filter((project) =>
      project.getTechnologies().some((tech) => tech.getId() === techId)
    )
    const filteredData = filteredProjects.map((project) => project.toData())
    return new Projects(filteredData, this.allTechnologies)
  }
}
