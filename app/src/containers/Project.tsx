import Breadcrumb from '@/components/Common/Breadcrumb'
import { MarkdownDisplay } from '@/components/Common/MarkdownDisplay'
import TechnologyTag from '@/components/Portfolio/TechnologyTag'
import { PortfolioData } from '@/controllers/data_controller'
import { PortfolioController } from '@/controllers/portfolio_controller'
import Error from 'next/error'
import Link from 'next/link'
import { useMemo } from 'react'

export type ProjectShowProps = {
  title: string
  data: PortfolioData
}

export const ProjectShow: React.FC<ProjectShowProps> = ({ title, data }) => {
  const controller = useMemo(() => new PortfolioController(data), [data])
  const project = useMemo(() => {
    const projects = controller.projects.getProjects()
    return projects.find((project) => project.getTitle() === title)
  }, [title, controller])
  const link = useMemo(() => project?.getLink(), [project])
  const github = useMemo(() => project?.getGithub(), [project])

  if (!project) return <Error statusCode={400} />

  const paths = [
    { name: 'トップページ', path: '/' },
    { name: 'プロジェクト', path: '/projects' },
    { name: project.getTitle(), path: `/projects/${title}` },
  ]

  return (
    <>
      <Breadcrumb paths={paths} />
      <div className="mx-auto px-5">
        <h1 className="title-underline ps-2">{project.getTitle()}</h1>
        <ul className="list-unstyled d-flex mx-4 flex-wrap">
          {project.getTechnologies().map((tech) => (
            <li key={tech.getId()} className="mx-1">
              <TechnologyTag technology={tech} size={15} />
            </li>
          ))}
        </ul>
        <ul className="list-unstyled links ms-4">
          {link && (
            <li className="my-2">
              アプリリンク:
              <Link target="_blank" href={link} className="ms-1">
                {link}
              </Link>
            </li>
          )}
          {github && (
            <li className="my-2">
              GitHub:
              <Link target="_blank" href={github} className="ms-1">
                {github}
              </Link>
            </li>
          )}
        </ul>
        <div className="markdown pb-5">
          <MarkdownDisplay content={project.getDetail()} />
        </div>
      </div>
    </>
  )
}
