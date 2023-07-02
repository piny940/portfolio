import { SkillItem } from '@/components/Portfolio/SkillItem'
import { skillsData } from '@/data/skills'

export type SkillsProps = {
  className?: string
}

export const Skills: React.FC<SkillsProps> = ({ className = '' }) => {
  return (
    <div className={'d-flex flex-column align-items-center p-5 ' + className}>
      <h1 className="text-center title-underline">Skills</h1>
      <div className="row row-cols-md-2 w-75 mt-4">
        {skillsData.map((skill) => (
          <div className="col p-3 my-3" key={skill.name}>
            <SkillItem skill={skill} />
          </div>
        ))}
      </div>
    </div>
  )
}
