import { ProfileData } from '@/models/profile'
import { IYamlLoader } from './_common'
import { ROOT_PATH } from '@/resources/constants'

export class ProfileLoader {
  #PROFILE_DATA_PATH = ROOT_PATH + 'src/data/profile.yml'
  #loader: IYamlLoader

  constructor(loader: IYamlLoader) {
    this.#loader = loader
  }

  load = () => {
    return this.#loader.load<ProfileData>(this.#PROFILE_DATA_PATH)
  }
}
