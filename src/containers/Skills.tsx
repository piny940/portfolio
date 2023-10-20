import { PortfolioData } from '@/controllers/data_controller'
import { memo } from 'react'

export type SkillsProps = {
  data: PortfolioData
}

const Skills = ({ data }: SkillsProps): JSX.Element => {
  return (
    <div className="container mt-3">
      <h1 className="title-underline">技術スタック</h1>
    </div>
  )
}

export default memo(Skills)
