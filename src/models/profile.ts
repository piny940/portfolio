export interface ProfileData {
  frontDescription: string
}

export class Profile {
  #data: ProfileData

  constructor(data: ProfileData) {
    this.#data = data
  }

  getFrontDescription = () => this.#data.frontDescription
}
