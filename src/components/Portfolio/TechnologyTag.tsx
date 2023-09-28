import { Technology } from '@/models/technology'
import { CSSProperties, memo } from 'react'

export type TechnologyTagProps = {
  technology: Technology
}

const TechnologyTag = ({ technology }: TechnologyTagProps): JSX.Element => {
  const style: CSSProperties = {
    backgroundColor: technology.getTagColor(),
  }
  return (
    <span className="badge rounded-pill small ms-1" style={style}>
      {technology.getName()}
    </span>
  )
}

export default memo(TechnologyTag)
