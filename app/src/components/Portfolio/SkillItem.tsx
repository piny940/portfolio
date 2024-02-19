import { PieItem } from '../Common/PieItem'
import Image from 'next/image'
import Link from 'next/link'
import { TestID } from '@/resources/TestID'
import { TechStack } from '@/server/_types'

export type SkillItemProps = {
  techStack: TechStack
  className?: string
}

export const SkillItem: React.FC<SkillItemProps> = ({
  techStack,
  className = '',
}) => {
  const tech = techStack.technology

  return (
    <PieItem
      testId={TestID.SKILL_ITEM}
      innerClassName="bg-body"
      className={'mx-auto ' + className}
      percent={techStack.proficiency}
    >
      <Link className="unstyled" href={`/skills/${techStack.technology.id}`}>
        <div className="d-flex flex-column mb-2">
          {tech.logoUrl && (
            <div className="icon text-center">
              <Image
                alt={`${tech.name}-logo`}
                src={tech.logoUrl}
                width={50}
                height={50}
              />
            </div>
          )}
          <span className="text-center">{tech.name}</span>
        </div>
      </Link>
    </PieItem>
  )
}
