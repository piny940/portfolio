import { ProjectType } from '@/resources/types'
import styled from 'styled-components'
import { MaterialIcon } from '../Common/MaterialIcon'
import Link from 'next/link'
import { useTheme } from '@/context/ThemeProvider'
import Image from 'next/image'
import githubWhiteIcon from '../../resources/images/common/github-white.png'
import githubIcon from '../../resources/images/common/github.png'

const ProjectItemDiv = styled.div`
  min-width: 200px;
  max-width: 100%;
`

export type ProjectItemProps = {
  project: ProjectType
  className?: string
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  className = '',
}) => {
  const { theme } = useTheme()

  return (
    <ProjectItemDiv
      className={
        'p-3 rounded border d-flex flex-column align-items-center ' + className
      }
    >
      <Link href={`/projects/${project.title}`}>
        <h3 className="h5 my-1 title-underline pb-1">{project.title}</h3>
      </Link>
      <p className="mt-2 mb-1 d-flex align-items-center">
        {project.github && (
          <Link target="_blank" href={project.github} className="mx-1">
            <Image
              src={theme === 'light' ? githubIcon : githubWhiteIcon}
              width={31}
              height={31}
              alt="github-icon"
            />
          </Link>
        )}
        {project.link && (
          <Link href={project.link} target="_blank" className="mx-1 text-body">
            <MaterialIcon name="share" />
          </Link>
        )}
      </p>
      <p className="my-1">{project.description}</p>
    </ProjectItemDiv>
  )
}
