export interface ProfileData {
  frontDescription: string
  qiita: string
  github: string
}

export class Profile {
  #data: ProfileData

  constructor(data: ProfileData) {
    this.#data = data
  }

  getFrontDescription = () => this.#data.frontDescription
  getQiita = () => this.#data.qiita
  getGithub = () => this.#data.github
}
