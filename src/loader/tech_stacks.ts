import { TechStacksData } from '@/models/tech_stack'
import { IYamlLoader } from './_common'

export class TechStacksLoader {
  #TECH_STACKS_DATA_PATH = 'src/data/tech_stacks.yml'
  #loader

  constructor(loader: IYamlLoader) {
    this.#loader = loader
  }

  load() {
    return this.#loader.load<TechStacksData>(this.#TECH_STACKS_DATA_PATH)
  }
}
