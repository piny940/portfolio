import Breadcrumb from '@/components/Common/Breadcrumb'
import BlogItems from '@/components/Portfolio/BlogItems'
import ProjectItems from '@/components/Portfolio/ProjectItems'
import { Technology } from '@/content/types'
import {
  getBlogs,
  getProjectIdsWithBlog,
  getProjects,
  getTechnologies,
  getTechnology,
} from '@/content'
import { notFound } from 'next/navigation'
import { JSX } from 'react'

interface SkillPageProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export const generateStaticParams = () =>
  getTechnologies().map(technology => ({ slug: technology.slug }))

const SkillPage = async ({
  params,
}: SkillPageProps): Promise<JSX.Element> => {
  const { slug } = await params
  const technology = getTechnology(slug)
  if (!technology) notFound()

  const hasTag = (tags: Technology[]) => tags.some(tag => tag.slug === slug)
  const projects = getProjects().filter(project => hasTag(project.tags))
  const projectIdsWithBlog = getProjectIdsWithBlog()
  const blogs = getBlogs().filter(blog => hasTag(blog.tags))

  const paths = [
    { name: 'トップページ', path: '/' },
    { name: '技術スタック', path: '/skills' },
    { name: technology.name, path: `/skills/${technology.slug}` },
  ]
  return (
    <div className="container pt-3">
      <Breadcrumb paths={paths} />
      <h1 className="h1 title-underline ps-3">{technology.name}</h1>
      {projects.length > 0 && (
        <section className="py-3">
          <h2>プロジェクト一覧</h2>
          <ProjectItems
            projectIdsWithBlog={projectIdsWithBlog}
            projects={projects}
          />
        </section>
      )}

      {blogs.length > 0 && (
        <section className="py-3">
          <h2>ブログ一覧</h2>
          <BlogItems blogs={blogs} />
        </section>
      )}
    </div>
  )
}

export default SkillPage
