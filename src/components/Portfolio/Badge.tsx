import { CSSProperties, JSX, memo, useMemo } from 'react'

export type BadgeProps = {
  color: string
  label: string
  size: number
  testId?: string
}

const Badge = ({
  color,
  label,
  size = 17,
  testId,
}: BadgeProps): JSX.Element => {
  const style = useMemo(
    (): CSSProperties => ({
      backgroundColor: color,
      fontSize: `${size}px`,
    }),
    [color, size],
  )
  return (
    <span data-testid={testId} style={style} className="badge tag-badge">
      {label}
    </span>
  )
}

export default memo(Badge)
