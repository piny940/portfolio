export interface TechStackData {
  technologyId: string
  proficiency: number
}

export class TechStack {
  #data

  constructor(data: TechStackData) {
    this.#data = data
  }

  getTechnologyId = () => this.#data.technologyId
  getProficiency = () => this.#data.proficiency
}
