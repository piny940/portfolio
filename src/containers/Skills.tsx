import { SkillItem } from '@/components/Portfolio/SkillItem'
// import { skillsData } from '@/data/skills'

export type SkillsProps = {
  className?: string
}

export const Skills: React.FC<SkillsProps> = ({ className = '' }) => {
  return (
    <section
      id="skills"
      className={'d-flex flex-column align-items-center p-5 ' + className}
    >
      <h2 className="h1 text-center title-underline">Skills</h2>
      <ul className="list-unstyled row row-cols-md-2 w-75 mt-4">
        {/* {skillsData.map((skill) => (
          <li className="col p-3 my-3" key={skill.name}>
            <SkillItem skill={skill} />
          </li>
        ))} */}
      </ul>
    </section>
  )
}
