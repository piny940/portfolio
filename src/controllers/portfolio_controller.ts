import { YamlLoader } from '@/loader/_common'
import { ProfileLoader } from '@/loader/profile'
import { ProjectsLoader } from '@/loader/projects'
import { TechStacksLoader } from '@/loader/tech_stacks'
import { TechnologiesLoader } from '@/loader/technologies'
import { ProfileData } from '@/models/profile'
import { ProjectsData } from '@/models/project'
import { TechStacksData } from '@/models/tech_stack'
import { TechnologiesData } from '@/models/technology'

export interface PortfolioData {
  profileData: ProfileData
  projectsData: ProjectsData
  technologiesData: TechnologiesData
  techStacksData: TechStacksData
}

class PortfolioController {
  #data

  getPortfolioData = () => {
    return this.#load()
  }

  #load = (): PortfolioData => {
    const yamlLoader = new YamlLoader()
    const projectsData = new ProjectsLoader(yamlLoader).load()
    const profileData = new ProfileLoader(yamlLoader).load()
    const technologiesData = new TechnologiesLoader(yamlLoader).load()
    const techStacksData = new TechStacksLoader(yamlLoader).load()

    return {
      projectsData,
      profileData,
      technologiesData,
      techStacksData,
    }
  }
}
