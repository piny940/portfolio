export interface ProjectData {
  title: string
  id: string
  description: string
  link?: string
  github?: string
  qiita?: string
  skills: string[]
}
export type ProjectsData = ProjectData[]

const GITHUB_URL = 'https://github.com'

export class Project {
  #projectData: ProjectData

  constructor(projectData: ProjectData) {
    this.#projectData = projectData
  }

  getTitle = () => this.#projectData.title
  getId = () => this.#projectData.id
  getDescription = () => this.#projectData.description
  getLink = () => this.#projectData.link
  getQiita = () => this.#projectData.qiita
  getSkills = () => this.#projectData.skills
  getGithub = () => {
    return this.#projectData.github === undefined
      ? `${GITHUB_URL}/${this.#projectData.id}`
      : this.#projectData.github
  }
}

export class Projects {
  #projects: readonly Project[] = []

  constructor(projectsData: ProjectsData) {
    this.#projects = projectsData.map((data) => new Project(data))
  }

  getProjects = () => this.#projects
}
