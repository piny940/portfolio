import { SkillItem } from '@/components/Portfolio/SkillItem'
import { TechStack } from '@/resources/types'

export type SkillsItemsProps = {
  techStacks: TechStack[]
  row?: number
}

export const SkillItems: React.FC<SkillsItemsProps> = ({
  techStacks,
  row = 3,
}) => {
  return (
    <ul className={`list-unstyled row row-cols-1 row-cols-sm-${row} g-4`}>
      {techStacks.map((techStack) => (
        <li className="col" key={techStack.id}>
          <SkillItem techStack={techStack} />
        </li>
      ))}
    </ul>
  )
}
