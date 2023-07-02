import { WorkType } from '@/resources/types'

export type WorkItemProps = {
  work: WorkType
  className?: string
}

export const WorkItem: React.FC<WorkItemProps> = ({ work, className = '' }) => {
  return <div className={className + ' border'}>{work.title}</div>
}
