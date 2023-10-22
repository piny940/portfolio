import { PortfolioData } from '@/controllers/data_controller'
import { PortfolioController } from '@/controllers/portfolio_controller'
import { ProjectItem } from '@/components/Portfolio/ProjectItem'
import { memo } from 'react'

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
      <div className="row row-cols-md-2 row-cols-xl-3 w-75 d-flex align-items-stretch">
        {controller
          .getProjects()
          .sortedByFavorite()
          .map((project) => (
            <div className="col-md p-3 my-3" key={project.getTitle()}>
              <ProjectItem project={project} />
            </div>
          ))}
      </div>
    </section>
  )
}

export default memo(Projects)
