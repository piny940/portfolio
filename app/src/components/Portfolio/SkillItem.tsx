import { PieItem } from '../Common/PieItem'
import Image from 'next/image'
import Link from 'next/link'
import { TestID } from '@/resources/TestID'
import { Technology } from '@/content/types'

export type SkillItemProps = {
  technology: Technology
  className?: string
}

export const SkillItem: React.FC<SkillItemProps> = ({
  technology,
  className = '',
}) => {
  return (
    <PieItem
      testId={TestID.SKILL_ITEM}
      innerClassName="bg-body"
      className={'mx-auto ' + className}
      percent={technology.proficiency ?? 0}
    >
      <Link className="unstyled" href={`/skills/${technology.slug}`}>
        <div className="d-flex flex-column mb-2">
          {technology.logoUrl && (
            <div className="icon text-center">
              <Image
                alt={`${technology.name}-logo`}
                src={technology.logoUrl}
                width={50}
                height={50}
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
          <span className="text-center">{technology.name}</span>
        </div>
      </Link>
    </PieItem>
  )
}
