import Breadcrumb from '@/components/Common/Breadcrumb'
import { MarkdownDisplay } from '@/components/Common/MarkdownDisplay'
import TechnologyTag from '@/components/Portfolio/TechnologyTag'
import Meta from '@/layouts/Meta'
import { Project } from '@/content/types'
import { getBlogContent, getProject, getProjectIdsWithBlog } from '@/content'
import { renderMarkdown } from '@/content/markdown'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { JSX } from 'react'

interface ProjectProps {
  project: Project
  blogHtml: string
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getProjectIdsWithBlog().map(id => ({ params: { id } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<ProjectProps> = async (ctx) => {
  const id = ctx.params?.id as string
  const project = getProject(id)
  const blogContent = getBlogContent(id)
  if (!project || !blogContent) return { notFound: true }

  return { props: { project, blogHtml: await renderMarkdown(blogContent) } }
}

const ProjectShow = ({ project, blogHtml }: ProjectProps): JSX.Element => {
  const { app: link, github } = project.links

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
          {project.tags.map(tag => (
            <li key={tag.slug} className="m-1">
              <TechnologyTag technology={tag} size={15} />
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
          <MarkdownDisplay html={blogHtml} />
        </div>
      </div>
    </>
  )
}

export default ProjectShow
