import { ProjectData, ProjectsData } from '@/models/project'
import { IFileLoader, IYamlLoader } from './_common'

type ProjectsBeforeLoad = Array<Omit<ProjectData, 'detail'>>

export class ProjectsLoader {
  #PROJECTS_DATA_PATH = 'src/data/projects.yml'

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

  #loadDetails = (projectsData: ProjectsBeforeLoad): ProjectsData => {
    return projectsData.map((project) => ({
      ...project,
      detail: this.fileLoader.load(project.detailSrc),
    }))
  }
}
