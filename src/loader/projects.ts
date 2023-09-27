import { ProjectsData } from '@/models/project'
import { IYamlLoader } from './_common'

export class ProjectsLoader {
  #PROJECTS_DATA_PATH = 'src/data/projects.yml'
  #loader: IYamlLoader

  constructor(loader: IYamlLoader) {
    this.#loader = loader
  }

  load = () => {
    return this.#loader.load<ProjectsData>(this.#PROJECTS_DATA_PATH)
  }
}
