import { SkillItem } from '@/components/Portfolio/SkillItem'
import { TechStack } from '@/models/tech_stack'

export type SkillsItemsProps = {
  techStacks: readonly TechStack[]
  row?: number
}

export const SkillItems: React.FC<SkillsItemsProps> = ({
  techStacks,
  row = 3,
}) => {
  return (
    <ul className={`list-unstyled row row-cols-md-${row} mt-4`}>
      {techStacks.map((techStack) => (
        <li className="col p-3 my-3" key={techStack.getTechnology().getId()}>
          <SkillItem techStack={techStack} />
        </li>
      ))}
    </ul>
  )
}
