import { IYamlLoader } from './_common'

class SkillsLoader {
  #SKILLS_DATA_PATH
  #loader

  constructor(loader: IYamlLoader) {
    this.#loader = loader
  }

  load() {}
}
