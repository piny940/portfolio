import { useTheme } from '@/context/ThemeProvider'
import { projectsData } from '@/data/projects'
import Error from 'next/error'
import Image from 'next/image'
import githubWhiteIcon from '../resources/images/common/github-white.png'
import githubIcon from '../resources/images/common/github.png'
import { MaterialIcon } from '@/components/Common/MaterialIcon'
import Link from 'next/link'
import { MarkdownDisplay } from '@/components/Common/MarkdownDisplay'

export type ProjectShowProps = {
  title: string
}

export const ProjectShow: React.FC<ProjectShowProps> = ({ title }) => {
  const project = projectsData.find((v) => v.title === title)
  const { theme } = useTheme()

  if (!project) return <Error statusCode={404} />
  return (
    <div className="wrapper mx-auto mt-3">
      <h1 className="title-underline ps-2">{title}</h1>
      <div className="row">
        <div className="col-lg-8">
          <div className="px-2">
            <MarkdownDisplay src={project.detailSrc} />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mt-2">
            {project?.imageSrc && (
              <Image
                src={project.imageSrc}
                alt="project image"
                style={{ width: '100%', height: 'auto' }}
                width={1920}
                height={1080}
              />
            )}
          </div>
          <div className="my-2 mx-3 d-flex flex-column align-items-center">
            <ul className="list-unstyled d-flex">
              <li className="mx-1">
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
              </li>
              <li className="mx-1">
                {project.link && (
                  <Link
                    href={project.link}
                    target="_blank"
                    className="text-body"
                  >
                    <MaterialIcon name="share" />
                  </Link>
                )}
              </li>
            </ul>
            <div className="skills text-muted small">
              <span className="me-2">使用技術:</span>{' '}
              {project.skills.map((skill, i) => (
                <span className="me-2" key={skill}>
                  {skill}
                  {i !== project.skills.length - 1 && ','}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
