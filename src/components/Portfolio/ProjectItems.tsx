import { ProjectItem } from '@/components/Portfolio/ProjectItem'
import { Project } from '@/models/project'

export type ProjectsIndexProps = {
  projects: Project[]
}

export const ProjectItems: React.FC<ProjectsIndexProps> = ({ projects }) => {
  return (
    <div className="row row-cols-md-2 row-cols-xl-3 w-75 d-flex align-items-stretch">
      {projects.map((project) => (
        <div className="col-md p-3 my-3" key={project.getTitle()}>
          <ProjectItem project={project} />
        </div>
      ))}
    </div>
  )
}
