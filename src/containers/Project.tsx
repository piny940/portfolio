import { PortfolioData } from '@/controllers/data_controller'
import { PortfolioController } from '@/controllers/portfolio_controller'
import Error from 'next/error'
import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'

export type ProjectShowProps = {
  title: string
  data: PortfolioData
}

export const ProjectShow: React.FC<ProjectShowProps> = ({ title, data }) => {
  const controller = new PortfolioController(data)
  const project = useMemo(() => {
    const projects = controller.getProjects().getProjects()
    return projects.find((project) => project.getTitle() === title)
  }, [title])

  if (!project) return <Error statusCode={400} />

  return (
    <div className="wrapper mx-auto mt-3">
      <h1 className="title-underline">{project.getTitle()}</h1>
      <div className="col-lg-6">
        <ReactMarkdown>{project.getDetail()}</ReactMarkdown>
      </div>
    </div>
  )
}
