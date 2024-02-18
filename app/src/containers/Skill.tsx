import { memo, useMemo } from 'react'
import Error from 'next/error'
import ProjectItems from '@/components/Portfolio/ProjectItems'
import Breadcrumb from '@/components/Common/Breadcrumb'
import BlogItems from '@/components/Portfolio/BlogItems'
import { PortfolioData } from '@/server/common'

export type SkillProps = {
  data: PortfolioData
  id: number
}

const Skill = ({ data, id }: SkillProps): JSX.Element => {
  const technology = useMemo(
    () => data.technologies.find((tech) => tech.id === id),
    [data, id]
  )
  const projects = useMemo(() => {
    return data.projects.filter((project) =>
      project.tags.map((tag) => tag.id).includes(id)
    )
  }, [id, data])
  const blogs = useMemo(() => {
    return data.blogs.filter((blog) =>
      blog.tags.map((tag) => tag.id).includes(id)
    )
  }, [id, data])

  if (!technology) return <Error statusCode={404} />

  const paths = [
    { name: 'トップページ', path: '/' },
    { name: '技術スタック', path: '/skills' },
    { name: technology.name, path: `/skills/${id}` },
  ]

  return (
    <div className="container pt-3">
      <Breadcrumb paths={paths} />
      <h1 className="h1 title-underline ps-3">{technology.name}</h1>
      {projects.length > 0 && (
        <section className="py-3">
          <h2>プロジェクト一覧</h2>
          <div className="d-flex flex-column align-items-center">
            <ProjectItems projects={projects} />
          </div>
        </section>
      )}

      {blogs.length > 0 && (
        <section className="py-3">
          <h2>ブログ一覧</h2>
          <div className="d-flex flex-column align-items-center">
            <BlogItems blogs={blogs} />
          </div>
        </section>
      )}
    </div>
  )
}

export default memo(Skill)
