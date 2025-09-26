import { useTheme } from '@/context/ThemeProvider'
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
  const { theme } = useTheme()

  const style = useMemo(
    (): CSSProperties => ({
      filter: theme === 'dark' ? 'brightness(85%)' : 'brightness(100%)',
      backgroundColor: color,
      fontSize: `${size}px`,
    }),
    [theme, color, size],
  )
  return (
    <span data-testid={testId} style={style} className="badge">
      {label}
    </span>
  )
}

export default memo(Badge)
