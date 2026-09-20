import Badge from './Badge'
import { TestID } from '@/resources/TestID'
import { JSX, memo } from 'react'
import Link from 'next/link'
import { Technology } from '@/content/types'

export type TechnologyTagProps = {
  technology: Technology
  size: number
}

const TechnologyTag = ({
  technology,
  size,
}: TechnologyTagProps): JSX.Element => {
  return (
    <Link href={`/skills/${technology.slug}`}>
      <Badge
        testId={TestID.TECHNOLOGY_BADGE}
        color={technology.tagColor}
        label={`#${technology.name}`}
        size={size}
      />
    </Link>
  )
}

export default memo(TechnologyTag)
