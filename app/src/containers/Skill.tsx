import { PortfolioData } from '@/controllers/data_controller'
import { memo, useMemo } from 'react'
import { PortfolioController } from '@/controllers/portfolio_controller'
import Error from 'next/error'
import ProjectItems from '@/components/Portfolio/ProjectItems'
import Breadcrumb from '@/components/Common/Breadcrumb'
import BlogItems from '@/components/Portfolio/BlogItems'

export type SkillProps = {
  data: PortfolioData
  id: string
}

const Skill = ({ data, id }: SkillProps): JSX.Element => {
  const controller = useMemo(() => new PortfolioController(data), [data])

  const technology = useMemo(
    () => controller.technologies.findById(id),
    [id, controller]
  )
  const projects = useMemo(() => {
    return controller.projects
      .filterByTechnology(technology.getId())
      .sortedByFavorite()
  }, [technology, controller])
  const blogs = useMemo(() => {
    return controller.blogs
      .filterByTechnology(technology.getId())
      .sortedByDates()
  }, [technology, controller])

  if (!technology) return <Error statusCode={404} />

  const paths = [
    { name: 'トップページ', path: '/' },
    { name: '技術スタック', path: '/skills' },
    { name: technology.getName(), path: `/skills/${id}` },
  ]

  return (
    <>
      <Breadcrumb paths={paths} />
      <div className="px-5">
        <h1 className="h1 title-underline ps-3">{technology.getName()}</h1>
        {projects.length > 0 && (
          <section className="py-3 px-5">
            <h2>プロジェクト一覧</h2>
            <div className="d-flex flex-column align-items-center">
              <ProjectItems projects={projects} />
            </div>
          </section>
        )}

        {blogs.length > 0 && (
          <section className="py-3 px-5">
            <h2>ブログ一覧</h2>
            <div className="d-flex flex-column align-items-center">
              <BlogItems blogs={blogs} />
            </div>
          </section>
        )}
      </div>
    </>
  )
}

export default memo(Skill)
