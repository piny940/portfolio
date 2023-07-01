import { SkillType } from '@/resources/types'
import { PieItem } from '../Common/PieItem'

export type SkillItemProps = {
  skill: SkillType
  className?: string
}

export const SkillItem: React.FC<SkillItemProps> = ({ skill, className }) => {
  return (
    <div className={className}>
      <PieItem className="mx-auto" label={skill.name} percent={skill.percent} />
    </div>
  )
}
