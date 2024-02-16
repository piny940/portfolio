import { ReactNode, useMemo } from 'react'
import styles from '@/styles/pie-item.module.scss'

export type PieItemProps = {
  percent: number
  children: ReactNode
  className?: string
  innerClassName?: string
  testId?: string
}

export const PieItem: React.FC<PieItemProps> = ({
  percent,
  children,
  className = '',
  innerClassName,
  testId,
}) => {
  const bgImage = useMemo(() => {
    const start = [0, 85, 255]
    const end = [0, 255, 238]
    const color = end.map((v, i) => start[i] + ((v - start[i]) * percent) / 100)
    return `conic-gradient(rgb(${start[0]}, ${start[1]}, ${start[2]}), rgb(${color[0]}, ${color[1]}, ${color[2]}) ${percent}%,
    rgb(79, 79, 79) ${percent}% 100%)`
  }, [percent])

  return (
    <div
      style={{ backgroundImage: bgImage }}
      data-testid={testId}
      className={`${className} ${styles.pieItem}`}
    >
      <div className={innerClassName}>{children}</div>
    </div>
  )
}
