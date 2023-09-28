import { IYamlLoader } from './_common'

class TechStacksLoader {
  #TECH_STACKS_DATA_PATH = 'src/data/tech_stacks.yml'
  #loader

  constructor(loader: IYamlLoader) {
    this.#loader = loader
  }

  load() {}
}
