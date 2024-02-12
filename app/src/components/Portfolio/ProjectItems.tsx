import { ProjectItem } from '@/components/Portfolio/ProjectItem'
import { Project } from '@/resources/types'
import { memo } from 'react'

export type ProjectItemsProps = {
  projects: Project[]
  row?: number
}

const ProjectItems: React.FC<ProjectItemsProps> = ({ projects, row = 3 }) => {
  return (
    <div
      className={`row row-cols-md-2 row-cols-xl-${row} d-flex align-items-stretch`}
    >
      {projects.map((project) => (
        <div className="col-md p-3 mb-3" key={project.title}>
          <ProjectItem project={project} />
        </div>
      ))}
    </div>
  )
}

export default memo(ProjectItems)
