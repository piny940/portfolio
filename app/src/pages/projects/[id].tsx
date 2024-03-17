import Breadcrumb from '@/components/Common/Breadcrumb'
import { MarkdownDisplay } from '@/components/Common/MarkdownDisplay'
import TechnologyTag from '@/components/Portfolio/TechnologyTag'
import Meta from '@/layouts/Meta'
import { Project } from '@/server/_types'
import { sdk } from '@/server/api'
import { getBlogContent } from '@/server/loader'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useMemo } from 'react'
import { PageProps } from '../_app'
import { getThemeFromCookie } from '@/server/helper'

interface ProjectProps extends PageProps {
  project: Project
  blogContent: string
}

export const getServerSideProps: GetServerSideProps<ProjectProps> = async (
  ctx
) => {
  const id = ctx.query.id as string
  const blogContent = getBlogContent(id)
  const project = (await sdk.fetchProject({ id })).project
  if (!project || !blogContent) return { notFound: true }
  return {
    props: { project, blogContent, initialTheme: getThemeFromCookie(ctx) },
  }
}

const ProjectShow = ({ project, blogContent }: ProjectProps): JSX.Element => {
  const link = useMemo(() => project.appLink, [project])
  const github = useMemo(() => project.githubLink, [project])

  const paths = [
    { name: 'トップページ', path: '/' },
    { name: 'プロジェクト', path: '/projects' },
    { name: project.title, path: `/projects/${project.id}` },
  ]

  return (
    <>
      <Meta />
      <div className="container pt-3">
        <Breadcrumb paths={paths} />
        <h1 className="title-underline ps-2">{project.title}</h1>
        <ul className="list-unstyled d-flex mx-lg-4 flex-wrap">
          {project.tags.map((tag) => (
            <li key={tag.technology.id} className="m-1">
              <TechnologyTag technology={tag.technology} size={15} />
            </li>
          ))}
        </ul>
        <ul className="list-unstyled links ms-1 ms-lg-4">
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
        <div className="markdown ps-lg-4">
          <MarkdownDisplay content={blogContent} />
        </div>
      </div>
    </>
  )
}

export default ProjectShow
