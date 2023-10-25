import { Technology } from '@/models/technology'
import Badge from './Badge'
import { TestID } from '@/resources/TestID'
import { memo } from 'react'

export type TechnologyTagProps = {
  technology: Technology
  size: number
}

const TechnologyTag = ({
  technology,
  size,
}: TechnologyTagProps): JSX.Element => {
  return (
    <Badge
      testId={TestID.TECHNOLOGY_BADGE}
      color={technology.getTagColor()}
      label={`#${technology.getName()}`}
      size={size}
    />
  )
}

export default memo(TechnologyTag)
