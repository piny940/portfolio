import { ProjectItem } from '@/components/Portfolio/ProjectItem'
import { projectsData } from '@/data/projects'

export type ProjectsProps = {
  className?: string
}

export const ProjectsIndex: React.FC<ProjectsProps> = ({ className = '' }) => {
  return (
    <div className={'d-flex flex-column align-items-center py-5 ' + className}>
      <h1 className="text-center title-underline">Projects</h1>
      <div className="row row-cols-md-2 row-cols-xl-3 w-75 mt-4">
        {projectsData.map((project) => (
          <div className="col-md p-3 my-3" key={project.title}>
            <ProjectItem project={project} />
          </div>
        ))}
      </div>
    </div>
  )
}
