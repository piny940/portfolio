import { BlogsLoader } from '@/loader/blogs'
import { FileLoader, YamlLoader } from '@/loader/common'
import { ProfileLoader } from '@/loader/profile'
import { ProjectsLoader } from '@/loader/projects'
import { TechStacksLoader } from '@/loader/tech_stacks'
import { TechnologiesLoader } from '@/loader/technologies'
import { BlogsData } from '@/models/blogs'
import { ProfileData } from '@/models/profile'
import { ProjectsData } from '@/models/project'
import { TechStacksData } from '@/models/tech_stack'
import { TechnologiesData } from '@/models/technology'

export interface PortfolioData {
  profileData: ProfileData
  projectsData: ProjectsData
  technologiesData: TechnologiesData
  techStacksData: TechStacksData
  blogsData: BlogsData
}

export class DataController {
  getPortfolioData = async () => {
    return await this.#load()
  }

  #load = async (): Promise<PortfolioData> => {
    const fileLoader = new FileLoader()
    const yamlLoader = new YamlLoader()
    const projectsData = new ProjectsLoader(fileLoader, yamlLoader).load()
    const profileData = new ProfileLoader(yamlLoader).load()
    const technologiesData = new TechnologiesLoader(yamlLoader).load()
    const techStacksData = new TechStacksLoader(yamlLoader).load()
    const blogsData = await new BlogsLoader().load()

    return {
      projectsData,
      profileData,
      technologiesData,
      techStacksData,
      blogsData,
    }
  }
}
