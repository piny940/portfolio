import { CSSProperties, memo } from 'react'
import styled from 'styled-components'

const BadgeSpan = styled.span`
  font-size: 17px;
`

export type BadgeProps = {
  color: string
  label: string
  size: number
}

const Badge = ({ color, label, size }: BadgeProps): JSX.Element => {
  const style: CSSProperties = {
    backgroundColor: color,
    fontSize: `${size}px`,
  }
  return (
    <BadgeSpan style={style} className="badge bg-primary">
      {label}
    </BadgeSpan>
  )
}

export default memo(Badge)
