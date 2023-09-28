export interface TechStackData {
  technologyId: string
  proficiency: number
}

export type TechStacksData = TechStackData[]

export class TechStack {
  #data: TechStackData

  constructor(data: TechStackData) {
    this.#data = data
  }

  getTechnologyId = () => this.#data.technologyId
  getProficiency = () => this.#data.proficiency
}

export class TechStacks {
  #techStacks: readonly TechStack[] = []

  constructor(techStacksData: TechStacksData) {
    this.#techStacks = techStacksData.map((data) => new TechStack(data))
  }

  getTechStacks = () => this.#techStacks
}
