export interface TechnologyData {
  id: string
  name: string
  logoSrc: string
  tagColor: string
}

export class Technology {
  #data: TechnologyData

  constructor(technologyData: TechnologyData) {
    this.#data = technologyData
  }
}
