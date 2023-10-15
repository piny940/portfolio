import { ProjectData, ProjectsData } from '@/models/project'
import { IFileLoader, IYamlLoader } from './_common'
import { ROOT_PATH } from '@/resources/constants'

type ProjectsBeforeLoad = Array<Omit<ProjectData, 'detail'>>

export class ProjectsLoader {
  #PROJECTS_DATA_PATH = ROOT_PATH + 'src/data/projects.yml'

  constructor(
    private readonly fileLoader: IFileLoader,
    private readonly yamlLoader: IYamlLoader
  ) {}

  load = () => {
    const projectsWithoutDetail = this.yamlLoader.load<ProjectsBeforeLoad>(
      this.#PROJECTS_DATA_PATH
    )
    const projectsData = this.#loadDetails(projectsWithoutDetail)
    return projectsData
  }

  #loadDetails = (projectsBeforeLoad: ProjectsBeforeLoad): ProjectsData => {
    const projectsData = projectsBeforeLoad.map((project) => ({
      ...project,
      detail: this.fileLoader.load(ROOT_PATH + project.detailSrc),
    }))
    return projectsData
  }
}
