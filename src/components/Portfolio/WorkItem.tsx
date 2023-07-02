import { WorkType } from '@/resources/types'
import styled from 'styled-components'

const WorkItemDiv = styled.div`
  min-width: 300px;
`

export type WorkItemProps = {
  work: WorkType
  className?: string
}

export const WorkItem: React.FC<WorkItemProps> = ({ work, className = '' }) => {
  return (
    <WorkItemDiv
      className={
        'p-3 rounded border d-flex flex-column align-items-center ' + className
      }
    >
      <h3 className="h5">{work.title}</h3>
      <p className="my-1">{work.description}</p>
    </WorkItemDiv>
  )
}
