import { Profile } from '@/models/profile'
import { Projects } from '@/models/project'
import { TechStacks } from '@/models/tech_stack'
import { Technologies } from '@/models/technology'
import { PortfolioData } from './data_controller'

export class PortfolioController {
  #profile: Profile
  #projects: Projects
  #technologies: Technologies
  #techStacks: TechStacks

  constructor(data: PortfolioData) {
    this.#profile = new Profile(data.profileData)
    this.#projects = new Projects(data.projectsData)
    this.#technologies = new Technologies(data.technologiesData)
    this.#techStacks = new TechStacks(data.techStacksData, this.#technologies)
  }

  getProfile = () => this.#profile
  getProjects = () => this.#projects
  getTechnologies = () => this.#technologies
  getTechStacks = () => this.#techStacks
}
