import { WorkType } from '@/resources/types'
import styled from 'styled-components'
import { MaterialIcon } from '../Common/MaterialIcon'
import Link from 'next/link'
import { useTheme } from '@/context/ThemeProvider'
import Image from 'next/image'

const WorkItemDiv = styled.div`
  min-width: 200px;
  max-width: 100%;
`

export type WorkItemProps = {
  work: WorkType
  className?: string
}

export const WorkItem: React.FC<WorkItemProps> = ({ work, className = '' }) => {
  const { theme } = useTheme()

  return (
    <WorkItemDiv
      className={
        'p-3 rounded border d-flex flex-column align-items-center ' + className
      }
    >
      <h3 className="h5 my-1 title-underline pb-1">{work.title}</h3>
      <p className="mt-2 mb-1 d-flex align-items-center">
        <Link target="_blank" href={work.github} className="mx-1">
          <Image
            src={
              theme === 'light'
                ? '/images/common/github.png'
                : '/images/common/github-white.png'
            }
            width={31}
            height={31}
            alt="github-icon"
          />
        </Link>
        {work.link && (
          <Link href={work.link} target="_blank" className="mx-1 text-body">
            <MaterialIcon name="share" />
          </Link>
        )}
      </p>
      <p className="my-1">{work.description}</p>
    </WorkItemDiv>
  )
}
