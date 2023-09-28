import { Skills } from './Skills'
import { Profiles } from './Profile'
import { ProjectsIndex } from './Projects'
import { PortfolioController } from '@/controllers/portfolio_controller'
import { PortfolioData } from '@/controllers/data_controller'

export type IndexProps = {
  data: PortfolioData
}

export const Index = ({ data }: IndexProps): JSX.Element => {
  const controller = new PortfolioController(data)

  return (
    <div id="index">
      <Profiles className="bg-body" profile={controller.getProfile()} />
      <Skills
        className="bg-body-tertiary"
        techStacks={controller.getTechStacks()}
      />
      <ProjectsIndex className="bg-body" projects={controller.getProjects()} />
    </div>
  )
}
