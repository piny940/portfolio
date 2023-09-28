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

  getId = () => this.#data.id
  getName = () => this.#data.name
  getLogoSrc = () => this.#data.logoSrc
  getTagColor = () => this.#data.tagColor
}
