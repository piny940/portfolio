import { SkillItems } from './SkillItems'
import { Profiles } from './Profile'
import { ProjectItems } from './ProjectItems'
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
      <SkillItems
        className="bg-body-tertiary"
        techStacks={controller.getTechStacks()}
      />
      <ProjectItems className="bg-body" projects={controller.getProjects()} />
    </div>
  )
}
