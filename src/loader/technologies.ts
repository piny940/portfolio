import { TechnologiesData } from '@/models/technology'
import { IYamlLoader } from './_common'
import { ROOT_PATH } from '@/resources/constants'

export class TechnologiesLoader {
  #TECHNOLOGIES_DATA_PATH = ROOT_PATH + 'src/data/technologies.yml'
  #loader

  constructor(loader: IYamlLoader) {
    this.#loader = loader
  }

  load() {
    return this.#loader.load<TechnologiesData>(this.#TECHNOLOGIES_DATA_PATH)
  }
}
