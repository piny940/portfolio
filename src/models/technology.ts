export interface TechnologyData {
  id: string
  name: string
  logoSrc: string
  tagColor: string
}

export class Technology {
  #data: TechnologyData

  constructor(data: TechnologyData) {
    this.#data = data
  }
}
