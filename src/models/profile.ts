export interface ProfileData {
  frontDescription: string
}

export class Profile {
  #profileData: ProfileData

  constructor(profileData: ProfileData) {
    this.#profileData = profileData
  }
}
