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
  #data: ProjectData

  constructor(data: ProjectData) {
    this.#data = data
  }

  getTitle = () => this.#data.title
  getId = () => this.#data.id
  getDescription = () => this.#data.description
  getLink = () => this.#data.link
  getQiita = () => this.#data.qiita
  getSkills = () => this.#data.skills
  getGithub = () => {
    return this.#data.github === undefined
      ? `${GITHUB_URL}/${this.#data.id}`
      : this.#data.github
  }
}

export class Projects {
  #projects: readonly Project[] = []

  constructor(projectsData: ProjectsData) {
    this.#projects = projectsData.map((data) => new Project(data))
  }

  getProjects = () => this.#projects
}
