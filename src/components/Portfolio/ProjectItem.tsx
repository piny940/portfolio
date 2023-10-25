import styled from 'styled-components'
import { MaterialIcon } from '../Common/MaterialIcon'
import Link from 'next/link'
import { useTheme } from '@/context/ThemeProvider'
import Image from 'next/image'
import githubWhiteIcon from '../../resources/images/common/github-white.png'
import githubIcon from '../../resources/images/common/github.png'
import qiitaIcon from '../../resources/images/common/qiita.png'
import { useMemo } from 'react'
import { Project } from '@/models/project'
import FavoriteIcon from './FavoriteIcon'
import { TestID } from '@/resources/TestID'

const ProjectItemDiv = styled.div`
  min-width: 300px;
  max-width: 100%;
`
const FavoriteIconDiv = styled.div`
  position: absolute;
  left: -10px;
  top: -10px;
`

export type ProjectItemProps = {
  project: Project
  className?: string
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  className = '',
}) => {
  const { theme } = useTheme()
  const githubLink = useMemo(() => project.getGithub(), [project])
  const projectLink = useMemo(() => project.getLink(), [project])
  const qiita = useMemo(() => project.getQiita(), [project])

  const renderTitle = () => (
    <h3 className="h5 my-1 title-underline pb-1">{project.getTitle()}</h3>
  )

  return (
    <ProjectItemDiv
      data-testid={TestID.PROJECT_ITEM}
      className={
        'p-3 rounded border d-flex flex-column align-items-center position-relative w-100 h-100 ' +
        className
      }
    >
      {project.getIsFavorite() && (
        <FavoriteIconDiv>
          <FavoriteIcon size={42} />
        </FavoriteIconDiv>
      )}
      {project.getDetail() ? (
        <Link className="unstyled" href={`/projects/${project.getTitle()}`}>
          {renderTitle()}
        </Link>
      ) : (
        renderTitle()
      )}
      <ul className="list-unstyled mt-2 mb-1 d-flex align-items-center">
        {githubLink && (
          <li>
            <Link target="_blank" href={githubLink} className="unstyled mx-1">
              <Image
                src={theme === 'light' ? githubIcon : githubWhiteIcon}
                width={31}
                height={31}
                alt="github-icon"
              />
            </Link>
          </li>
        )}
        {qiita && (
          <li>
            <Link href={qiita} target="_blank" className="unstyled mx-1">
              <Image src={qiitaIcon} width={31} height={31} alt="qiita-icon" />
            </Link>
          </li>
        )}
        {projectLink && (
          <li>
            <Link
              href={projectLink}
              target="_blank"
              className="unstyled mx-1 text-body d-flex align-items-center"
            >
              <MaterialIcon name="open_in_new" size={31} />
            </Link>
          </li>
        )}
      </ul>
      <div className="d-flex flex-column align-items-center mt-1">
        <h4 className="small text-muted fw-normal p-0 m-0">使用技術</h4>
        <p className="small text-muted text-center">
          {project
            .getTechnologies()
            .map((tech) => tech.getName())
            .join(', ')}
        </p>
      </div>
      <p className="">{project.getDescription()}</p>
    </ProjectItemDiv>
  )
}
