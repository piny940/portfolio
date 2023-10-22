import { PortfolioData } from '@/controllers/data_controller'
import { memo, useMemo } from 'react'
import { PortfolioController } from '@/controllers/portfolio_controller'
import Error from 'next/error'
import { ProjectItems } from '@/components/Portfolio/ProjectItems'

export type SkillProps = {
  data: PortfolioData
  id: string
}

const Skill = ({ data, id }: SkillProps): JSX.Element => {
  const controller = new PortfolioController(data)
  const skill = useMemo(
    () => controller.getTechStacks().findByTechnologyId(id),
    [id, data]
  )

  if (!skill) return <Error statusCode={404} />
  return (
    <div className="container mt-3">
      <h1 className="title-underline ps-2">
        {skill.getTechnology().getName()}
      </h1>
      <section className="py-5 px-5">
        <h2>プロジェクト一覧</h2>
        <div className="d-flex flex-column align-items-center">
          <ProjectItems
            projects={controller.getProjects().sortedByFavorite()}
          />
        </div>
      </section>
    </div>
  )
}

export default memo(Skill)
