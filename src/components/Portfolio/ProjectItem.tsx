import Link from 'next/link'
import Image from 'next/image'
import openInNewLightIcon from '../../resources/images/common/open-in-new-light.svg'
import openInNewDarkIcon from '../../resources/images/common/open-in-new-dark.svg'
import githubWhiteIcon from '../../resources/images/common/github-white.png'
import githubIcon from '../../resources/images/common/github.png'
import qiitaIcon from '../../resources/images/common/qiita.png'
import { useMemo } from 'react'
import FavoriteIcon from './FavoriteIcon'
import { TestID } from '@/resources/TestID'
import styles from '@/styles/item.module.css'
import { Project } from '@/content/types'

export type ProjectItemProps = {
  project: Project
  hasBlog: boolean
  className?: string
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  hasBlog,
  className = '',
}) => {
  const mainLink = useMemo(
    () => (hasBlog ? `/projects/${project.id}` : project.links.qiita),
    [project, hasBlog],
  )
  const { app: projectLink, github: githubLink, qiita } = project.links

  const renderTitle = () => (
    <h3 className="h5 my-1 title-underline pb-1">{project.title}</h3>
  )

  return (
    <div
      data-testid={TestID.PROJECT_ITEM}
      className={
        'p-3 rounded border d-flex flex-column align-items-center position-relative w-100 h-100 '
        + className
      }
    >
      {project.isFavorite && (
        <div className={styles.favoriteIcon}>
          <FavoriteIcon size={42} />
        </div>
      )}
      {mainLink
        ? (
            <Link
              className="unstyled"
              href={mainLink}
              target={hasBlog ? '_self' : '_blank'}
            >
              {renderTitle()}
            </Link>
          )
        : (
            renderTitle()
          )}
      <ul className="list-unstyled mt-2 mb-1 d-flex align-items-center">
        {githubLink && (
          <li>
            <Link target="_blank" href={githubLink} className="unstyled mx-1">
              <Image
                src={githubIcon}
                width={31}
                height={31}
                alt="github-icon"
                className="on-light"
              />
              <Image
                src={githubWhiteIcon}
                width={31}
                height={31}
                alt="github-icon"
                className="on-dark"
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
              <Image
                src={openInNewLightIcon}
                alt="open in new"
                width={31}
                height={31}
                className="on-light"
              />
              <Image
                src={openInNewDarkIcon}
                alt="open in new"
                width={31}
                height={31}
                className="on-dark"
              />
            </Link>
          </li>
        )}
      </ul>
      <div className="d-flex flex-column align-items-center mt-1">
        <h4 className="small text-muted fw-normal p-0 m-0">使用技術</h4>
        <p className="small text-muted text-center">
          {project.tags.map(tag => tag.name).join(', ')}
        </p>
      </div>
      <p className="">{project.description}</p>
    </div>
  )
}
