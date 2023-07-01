import { PieItem } from '../Common/PieItem'

export type SkillItemProps = {
  name: string
  percent: number
  className?: string
}

export const SkillItem: React.FC<SkillItemProps> = ({
  name,
  percent,
  className,
}) => {
  return (
    <div className={className}>
      <PieItem className="mx-auto" label={name} percent={percent} />
    </div>
  )
}
