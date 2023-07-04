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
        <div className="col-lg-6 position-relative">
          {project?.imageSrc && (
            <Image
              alt="image"
              src={project?.imageSrc}
              width={400}
              height={200}
            />
          )}
        </div>
      </div>
    </div>
  )
}
