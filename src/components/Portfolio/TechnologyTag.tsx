import { Technology } from '@/models/technology'
import Badge from './Badge'
import { TestID } from '@/resources/TestID'
import { memo } from 'react'
import Link from 'next/link'

export type TechnologyTagProps = {
  technology: Technology
  size: number
}

const TechnologyTag = ({
  technology,
  size,
}: TechnologyTagProps): JSX.Element => {
  return (
    <Link href={`/skills/${technology.getId()}`}>
      <Badge
        testId={TestID.TECHNOLOGY_BADGE}
        color={technology.getTagColor()}
        label={`#${technology.getName()}`}
        size={size}
      />
    </Link>
  )
}

export default memo(TechnologyTag)
