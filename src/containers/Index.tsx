import { SkillItems } from './SkillItems'
import { Profiles } from './Profile'
import { ProjectItems } from '../components/Portfolio/ProjectItems'
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
      <section
        id="projects"
        className="d-flex flex-column align-items-center py-5"
      >
        <h2 className="h1 text-center title-underline">プロジェクト</h2>
        <ProjectItems projects={controller.getProjects().sortedByFavorite()} />
      </section>
    </div>
  )
}
