import { memo } from 'react'
import Breadcrumb from '@/components/Common/Breadcrumb'
import { TechStack } from '@/resources/types'
import { SkillItems } from '@/components/Portfolio/SkillItems'

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
    <div className="container pt-3">
      <Breadcrumb paths={paths} />
      <div className="d-flex align-items-center flex-column row-gap-3 row-gap-md-5">
        <h1 className="h1 text-center title-underline">技術スタック</h1>
        <SkillItems techStacks={data.techStacks} />
      </div>
    </div>
  )
}

export default memo(Skills)
