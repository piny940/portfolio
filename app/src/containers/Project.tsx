import Breadcrumb from '@/components/Common/Breadcrumb'
import { MarkdownDisplay } from '@/components/Common/MarkdownDisplay'
import TechnologyTag from '@/components/Portfolio/TechnologyTag'
import { Project } from '@/resources/types'
import Error from 'next/error'
import Link from 'next/link'
import { useMemo } from 'react'

export type ProjectShowProps = {
  id: string
  data: {
    projects: Project[]
  }
}

export const ProjectShow: React.FC<ProjectShowProps> = ({ id, data }) => {
  const project = useMemo(() => {
    const projects = data.projects
    return projects.find((project) => project.id === id)
  }, [id, data])
  const link = useMemo(() => project?.appLink, [project])
  const github = useMemo(() => project?.githubLink, [project])

  if (!project?.blogContent) return <Error statusCode={400} />

  const paths = [
    { name: 'トップページ', path: '/' },
    { name: 'プロジェクト', path: '/projects' },
    { name: project.title, path: `/projects/${id}` },
  ]

  return (
    <>
      <Breadcrumb paths={paths} />
      <div className="mx-auto px-5">
        <h1 className="title-underline ps-2">{project.title}</h1>
        <ul className="list-unstyled d-flex mx-4 flex-wrap">
          {project.tags.map((tech) => (
            <li key={tech.id} className="mx-1">
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
          <MarkdownDisplay content={project.blogContent} />
        </div>
      </div>
    </>
  )
}
