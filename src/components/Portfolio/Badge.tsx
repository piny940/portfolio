import { CSSProperties, memo } from 'react'
import styled from 'styled-components'

const BadgeSpan = styled.span`
  font-size: 17px;
`

export type BadgeProps = {
  color: string
  label: string
  size: number
  testId?: string
}

const Badge = ({ color, label, size, testId }: BadgeProps): JSX.Element => {
  const style: CSSProperties = {
    backgroundColor: color,
    fontSize: `${size}px`,
  }
  return (
    <BadgeSpan data-testid={testId} style={style} className="badge bg-primary">
      {label}
    </BadgeSpan>
  )
}

export default memo(Badge)
