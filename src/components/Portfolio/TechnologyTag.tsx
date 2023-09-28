import { Technology } from '@/models/technology'
import { memo } from 'react'

export type TechnologyTagProps = {
  technology: Technology
}

const TechnologyTag = ({ technology }: TechnologyTagProps): JSX.Element => {
  return <span>{technology.getName()}</span>
}

export default memo(TechnologyTag)
