import { memo } from 'react'
import ProjectItems from '@/components/Portfolio/ProjectItems'
import Breadcrumb from '@/components/Common/Breadcrumb'
import { Project } from '@/resources/types'

export type ProjectsProps = {
  data: {
    projects: Project[]
  }
}

const Projects = ({ data }: ProjectsProps): JSX.Element => {
  const paths = [
    { name: 'トップページ', path: '/' },
    { name: 'プロジェクト', path: '/projects' },
  ]

  return (
    <div className="container pt-3">
      <Breadcrumb paths={paths} />
      <section
        id="projects"
        className="d-flex align-items-center flex-column row-gap-3 row-gap-md-5"
      >
        <h1 className="h1 title-underline px-1">プロジェクト</h1>
        <ProjectItems projects={data.projects} />
      </section>
    </div>
  )
}

export default memo(Projects)
