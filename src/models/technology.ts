export interface TechnologyData {
  id: string
  name: string
  logoSrc: string
  tagColor: string
}

export type TechnologiesData = TechnologyData[]

export class Technology {
  #data: TechnologyData

  constructor(data: TechnologyData) {
    this.#data = data
  }

  getId = () => this.#data.id
  getName = () => this.#data.name
  getLogoSrc = () => this.#data.logoSrc
  getTagColor = () => this.#data.tagColor
}

export class Technologies {
  #technologies: readonly Technology[] = []

  constructor(technologiesData: TechnologiesData) {
    this.#technologies = technologiesData.map((data) => new Technology(data))
  }

  getTechnologies = () => this.#technologies
}
