import { ITechnologies } from './technology'

export interface TechStackData {
  technologyId: string
  proficiency: number
}

export type TechStacksData = TechStackData[]

export class TechStack {
  #data: TechStackData
  #technologies: ITechnologies

  constructor(data: TechStackData, technologies: ITechnologies) {
    this.#data = data
    this.#technologies = technologies
  }

  getTechnology = () => this.#technologies.findById(this.#data.technologyId)
  getProficiency = () => this.#data.proficiency
}

export interface ITechStacks {
  getTechStacks: () => readonly TechStack[]
}
export class TechStacks {
  #techStacks: readonly TechStack[] = []

  constructor(techStacksData: TechStacksData, technologies: ITechnologies) {
    this.#techStacks = techStacksData.map(
      (data) => new TechStack(data, technologies)
    )
  }

  getTechStacks = () => this.#techStacks
  sortedByProficiency = () =>
    this.#techStacks
      .slice()
      .sort((a, b) => b.getProficiency() - a.getProficiency())
}
