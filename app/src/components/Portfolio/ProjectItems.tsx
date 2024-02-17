import { ProjectItem } from '@/components/Portfolio/ProjectItem'
import { Project } from '@/resources/types'
import { memo } from 'react'

export type ProjectItemsProps = {
  projects: Project[]
  row?: number
}

const ProjectItems: React.FC<ProjectItemsProps> = ({ projects, row = 3 }) => {
  return (
    <div className={`row row-cols-1 row-cols-md-2 row-cols-xl-${row} gy-4`}>
      {projects.map((project) => (
        <div className="col" key={project.title}>
          <ProjectItem project={project} />
        </div>
      ))}
    </div>
  )
}

export default memo(ProjectItems)
