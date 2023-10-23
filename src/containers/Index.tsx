import { SkillItems } from '../components/Portfolio/SkillItems'
import { ProjectItems } from '../components/Portfolio/ProjectItems'
import { PortfolioController } from '@/controllers/portfolio_controller'
import { PortfolioData } from '@/controllers/data_controller'
import { Profiles } from '@/components/Portfolio/Profile'
import Link from 'next/link'

export type IndexProps = {
  data: PortfolioData
}

export const Index = ({ data }: IndexProps): JSX.Element => {
  const controller = new PortfolioController(data)

  return (
    <div id="index">
      <Profiles className="bg-body" profile={controller.getProfile()} />
      <section
        id="skills"
        className="d-flex flex-column align-items-center p-5 bg-body-tertiary"
      >
        <Link href="/skills" className="unstyled">
          <h2 className="h1 text-center title-underline">技術スタック</h2>
        </Link>
        <SkillItems
          techStacks={controller
            .getTechStacks()
            .sortedByProficiency()
            .slice(0, 6)}
        />
      </section>
      <section
        id="projects"
        className="d-flex flex-column align-items-center py-5 container px-4"
      >
        <Link href="/projects" className="unstyled">
          <h2 className="h1 text-center title-underline">プロジェクト</h2>
        </Link>
        <div className="mt-4">
          <ProjectItems
            projects={controller.getProjects().sortedByFavorite()}
          />
        </div>
      </section>
    </div>
  )
}
