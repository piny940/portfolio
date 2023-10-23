import { PortfolioData } from '@/controllers/data_controller'
import { PortfolioController } from '@/controllers/portfolio_controller'
import { memo } from 'react'
import { ProjectItems } from '@/components/Portfolio/ProjectItems'
import Breadcrumb from '@/components/Common/Breadcrumb'

export type ProjectsProps = {
  data: PortfolioData
}

const Projects = ({ data }: ProjectsProps): JSX.Element => {
  const controller = new PortfolioController(data)
  const paths = [
    { name: 'トップページ', path: '/' },
    { name: 'プロジェクト', path: '/projects' },
  ]

  return (
    <div className="">
      <Breadcrumb paths={paths} />
      <section
        id="projects"
        className="d-flex flex-column align-items-center pb-5 container px-4"
      >
        <h2 className="h1 text-center title-underline">プロジェクト</h2>
        <div className="mt-3">
          <ProjectItems
            projects={controller.getProjects().sortedByFavorite()}
          />
        </div>
      </section>
    </div>
  )
}

export default memo(Projects)
