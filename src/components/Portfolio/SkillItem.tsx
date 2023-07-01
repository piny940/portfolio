import { SkillType } from '@/resources/types'
import { PieItem } from '../Common/PieItem'
import Image from 'next/image'

export type SkillItemProps = {
  skill: SkillType
  className?: string
}

export const SkillItem: React.FC<SkillItemProps> = ({ skill, className }) => {
  return (
    <div className={className}>
      <PieItem className="mx-auto" percent={skill.percent}>
        <div className="d-flex flex-column mb-2">
          {skill.logoSrc && (
            <div className="icon text-center">
              <Image
                alt={`${skill.name}-logo`}
                src={skill.logoSrc}
                width={50}
                height={50}
              />
            </div>
          )}
          <span className="text-center">{skill.name}</span>
        </div>
      </PieItem>
    </div>
  )
}
