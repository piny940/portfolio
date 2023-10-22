import { PortfolioData } from '@/controllers/data_controller'
import { PortfolioController } from '@/controllers/portfolio_controller'
import { memo } from 'react'
import { ProjectItems } from '@/components/Portfolio/ProjectItems'

export type ProjectsProps = {
  data: PortfolioData
}

const Projects = ({ data }: ProjectsProps): JSX.Element => {
  const controller = new PortfolioController(data)

  return (
    <section
      id="projects"
      className="d-flex flex-column align-items-center py-5"
    >
      <h2 className="h1 text-center title-underline">プロジェクト</h2>
      <ProjectItems projects={controller.getProjects().sortedByFavorite()} />
    </section>
  )
}

export default memo(Projects)
