import { ProjectItem } from '@/components/Portfolio/ProjectItem'
import { Project } from '@/content/types'
import { memo } from 'react'

export type ProjectItemsProps = {
  projects: Project[]
  projectIdsWithBlog: string[]
  row?: number
  collapseCount?: number
}

const ProjectItems: React.FC<ProjectItemsProps> = ({
  projects,
  projectIdsWithBlog,
  row = 3,
  collapseCount = 0,
}) => {
  return (
    <div className={`row row-cols-1 row-cols-md-2 row-cols-xl-${row} gy-4`}>
      {projects.map((project, idx) => (
        <div className={'col ' + (idx < projects.length - collapseCount ? '' : 'd-none d-md-block')} key={project.id}>
          <ProjectItem
            hasBlog={projectIdsWithBlog.includes(project.id)}
            project={project}
          />
        </div>
      ))}
    </div>
  )
}

export default memo(ProjectItems)
