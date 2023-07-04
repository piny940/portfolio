import { projectsData } from '@/data/projects'
import Error from 'next/error'
import Image from 'next/image'

export type ProjectShowProps = {
  title: string
}

export const ProjectShow: React.FC<ProjectShowProps> = ({ title }) => {
  const project = projectsData.find((v) => v.title === title)

  if (!project) return <Error statusCode={404} />
  return (
    <div className="wrapper mx-auto mt-3">
      <h1 className="title-underline">{title}</h1>
      <div className="row">
        <div className="col-lg-6">
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
      </div>
    </div>
  )
}
