import { memo } from 'react'
import { SkillItem } from '@/components/Portfolio/SkillItem'
import Breadcrumb from '@/components/Common/Breadcrumb'
import { TechStack } from '@/resources/types'

export type SkillsProps = {
  data: {
    techStacks: TechStack[]
  }
}

const Skills = ({ data }: SkillsProps): JSX.Element => {
  const paths = [
    { name: 'トップページ', path: '/' },
    { name: '技術スタック', path: '/skills' },
  ]

  return (
    <>
      <Breadcrumb paths={paths} />
      <div className="container mb-5 d-flex align-items-center flex-column">
        <h1 className="h1 text-center title-underline">技術スタック</h1>
        <ul className="list-unstyled row row-cols-md-3 mt-4">
          {data.techStacks.map((techStack) => (
            <li className="col p-3 my-3" key={techStack.technology.id}>
              <SkillItem techStack={techStack} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default memo(Skills)
