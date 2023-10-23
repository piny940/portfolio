import { PortfolioData } from '@/controllers/data_controller'
import { memo } from 'react'
import { PortfolioController } from '@/controllers/portfolio_controller'
import { SkillItem } from '@/components/Portfolio/SkillItem'
import Breadcrumb from '@/components/Common/Breadcrumb'

export type SkillsProps = {
  data: PortfolioData
}

const Skills = ({ data }: SkillsProps): JSX.Element => {
  const controller = new PortfolioController(data)

  const paths = [
    { name: 'トップページ', path: '/' },
    { name: '技術スタック', path: '/skills' },
  ]

  return (
    <div className="">
      <Breadcrumb paths={paths} />
      <div className="container mb-5 d-flex align-items-center flex-column">
        <h1 className="h1 text-center title-underline">技術スタック</h1>
        <ul className="list-unstyled row row-cols-md-3 mt-4">
          {controller
            .getTechStacks()
            .sortedByProficiency()
            .map((techStack) => (
              <li
                className="col p-3 my-3"
                key={techStack.getTechnology().getName()}
              >
                <SkillItem techStack={techStack} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default memo(Skills)
