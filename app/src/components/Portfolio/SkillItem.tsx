import { PieItem } from '../Common/PieItem'
import Image from 'next/image'
import { TechStack } from '@/models/tech_stack'
import Link from 'next/link'
import { TestID } from '@/resources/TestID'

export type SkillItemProps = {
  techStack: TechStack
  className?: string
}

export const SkillItem: React.FC<SkillItemProps> = ({
  techStack,
  className = '',
}) => {
  const tech = techStack.getTechnology()

  return (
    <PieItem
      testId={TestID.SKILL_ITEM}
      innerClassName="bg-body"
      className={'mx-auto ' + className}
      percent={techStack.getProficiency()}
    >
      <Link
        className="unstyled"
        href={`/skills/${techStack.getTechnology().getId()}`}
      >
        <div className="d-flex flex-column mb-2">
          {tech.getLogoSrc() && (
            <div className="icon text-center">
              <Image
                alt={`${tech.getName()}-logo`}
                src={tech.getLogoSrc()}
                width={50}
                height={50}
              />
            </div>
          )}
          <span className="text-center">{tech.getName()}</span>
        </div>
      </Link>
    </PieItem>
  )
}
