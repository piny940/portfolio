import { WorkType } from '@/resources/types'
import styled from 'styled-components'
import { MaterialIcon } from '../Common/MaterialIcon'
import Link from 'next/link'

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
      <h3 className="h5 my-1">{work.title}</h3>
      <p className="mt-2 mb-0">
        {work.link && (
          <Link href={work.link}>
            <MaterialIcon name="share" />
          </Link>
        )}
      </p>
      <p className="my-1">{work.description}</p>
    </WorkItemDiv>
  )
}
