import { useTheme } from '@/context/ThemeProvider'
import { projectsData } from '@/data/projects'
import Error from 'next/error'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import githubWhiteIcon from '../resources/images/common/github-white.png'
import githubIcon from '../resources/images/common/github.png'
import { MaterialIcon } from '@/components/Common/MaterialIcon'
import Link from 'next/link'

export type ProjectShowProps = {
  title: string
}

export const ProjectShow: React.FC<ProjectShowProps> = ({ title }) => {
  const project = projectsData.find((v) => v.title === title)
  const [detail, setDetail] = useState('')
  const { theme } = useTheme()

  const loadDetail = async () => {
    if (!project?.detailSrc) return

    const response = await fetch(project.detailSrc)
    setDetail(await response.text())
  }

  useEffect(() => {
    void loadDetail()
  })

  if (!project) return <Error statusCode={404} />
  return (
    <div className="wrapper mx-auto mt-3">
      <h1 className="title-underline">{title}</h1>
      <div className="row">
        <div className="col-lg-8">
          <div className="px-2">
            <ReactMarkdown>{detail}</ReactMarkdown>
          </div>
        </div>
        <div className="col-lg-4">
          {project?.imageSrc && (
            <Image
              src={project.imageSrc}
              alt="project image"
              style={{ width: '100%', height: 'auto' }}
              width={1920}
              height={1080}
            />
          )}
          <div className="my-2 mx-3">
            <ul className="list-unstyled d-flex justify-content-center">
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
          </div>
        </div>
      </div>
    </div>
  )
}
