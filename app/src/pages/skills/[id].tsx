import Breadcrumb from '@/components/Common/Breadcrumb'
import BlogItems from '@/components/Portfolio/BlogItems'
import ProjectItems from '@/components/Portfolio/ProjectItems'
import Meta from '@/layouts/Meta'
import { Blog, Project, Technology } from '@/server/_types'
import { sdk } from '@/server/api'
import { getProjectIdsWithBlog } from '@/server/loader'
import { GetServerSideProps } from 'next'
import { PageProps } from '../_app'
import { getThemeFromCookie } from '@/server/helper'

interface SkillProps extends PageProps {
  projects: Project[]
  projectIdsWithBlog: string[]
  blogs: Blog[]
  technology: Technology
}

export const getServerSideProps: GetServerSideProps<SkillProps> = async (
  ctx
) => {
  const id = parseInt(ctx.query.id as string)
  const data = await sdk.fetchTechnology({ id })
  const projects = data.projects.filter((project) =>
    project.tags.map((tag) => tag.id).includes(id)
  )
  const blogs = data.blogs.filter((blog) =>
    blog.tags.map((tag) => tag.technology.id).includes(id)
  )
  return {
    props: {
      projects,
      projectIdsWithBlog: getProjectIdsWithBlog(),
      blogs,
      technology: data.technology,
      initialTheme: getThemeFromCookie(ctx),
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
    { name: technology.name, path: `/skills/${technology.id}` },
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
