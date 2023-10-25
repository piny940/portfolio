import { ProjectItem } from '@/components/Portfolio/ProjectItem'
import { Project } from '@/models/project'
import { memo } from 'react'

export type ProjectItemsProps = {
  projects: readonly Project[]
}

const ProjectItems: React.FC<ProjectItemsProps> = ({ projects }) => {
  return (
    <div className="row row-cols-md-2 row-cols-xl-3 d-flex align-items-stretch">
      {projects.map((project) => (
        <div className="col-md p-3 mb-3" key={project.getTitle()}>
          <ProjectItem project={project} />
        </div>
      ))}
    </div>
  )
}

export default memo(ProjectItems)
