import { SkillItem } from '@/components/Portfolio/SkillItem'
import { TechStacks } from '@/models/tech_stack'

export type SkillsProps = {
  className?: string
  techStacks: TechStacks
}

export const SkillItems: React.FC<SkillsProps> = ({
  className = '',
  techStacks,
}) => {
  return (
    <section
      id="skills"
      className={'d-flex flex-column align-items-center p-5 ' + className}
    >
      <h2 className="h1 text-center title-underline">技術スタック</h2>
      <ul className="list-unstyled row row-cols-md-2 w-75 mt-4">
        {techStacks
          .sortedByProficiency()
          .slice(0, 6)
          .map((techStack) => (
            <li
              className="col p-3 my-3"
              key={techStack.getTechnology().getName()}
            >
              <SkillItem techStack={techStack} />
            </li>
          ))}
      </ul>
    </section>
  )
}
