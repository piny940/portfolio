import { TechStacksData } from '@/models/tech_stack'
import { IYamlLoader } from './_common'
import { ROOT_PATH } from '@/resources/constants'

export class TechStacksLoader {
  #TECH_STACKS_DATA_PATH = ROOT_PATH + 'src/data/tech_stacks.yml'
  #loader

  constructor(loader: IYamlLoader) {
    this.#loader = loader
  }

  load() {
    return this.#loader.load<TechStacksData>(this.#TECH_STACKS_DATA_PATH)
  }
}
