import Breadcrumb from '@/components/Common/Breadcrumb'
import BlogItems from '@/components/Portfolio/BlogItems'
import ProjectItems from '@/components/Portfolio/ProjectItems'
import Meta from '@/layouts/Meta'
import { Blog, Project, Technology } from '@/content/types'
import {
  getBlogs,
  getProjectIdsWithBlog,
  getProjects,
  getTechnologies,
  getTechnology,
} from '@/content'
import { GetStaticPaths, GetStaticProps } from 'next'
import { JSX } from 'react'

interface SkillProps {
  projects: Project[]
  projectIdsWithBlog: string[]
  blogs: Blog[]
  technology: Technology
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getTechnologies().map(technology => ({
    params: { slug: technology.slug },
  })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<SkillProps> = async (ctx) => {
  const slug = ctx.params?.slug as string
  const technology = getTechnology(slug)
  if (!technology) return { notFound: true }

  const hasTag = (tags: Technology[]) => tags.some(tag => tag.slug === slug)
  return {
    props: {
      projects: getProjects().filter(project => hasTag(project.tags)),
      projectIdsWithBlog: getProjectIdsWithBlog(),
      blogs: getBlogs().filter(blog => hasTag(blog.tags)),
      technology,
    },
  }
}

const SkillPage = ({
  technology,
  projects,
  blogs,
  projectIdsWithBlog,
}: SkillProps): JSX.Element => {
  const paths = [
    { name: 'トップページ', path: '/' },
    { name: '技術スタック', path: '/skills' },
    { name: technology.name, path: `/skills/${technology.slug}` },
  ]
  return (
    <>
      <Meta />
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
    </>
  )
}

export default SkillPage
