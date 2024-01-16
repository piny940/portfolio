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
    <>
      <Breadcrumb paths={paths} />
      <section
        id="projects"
        className="d-flex flex-column align-items-center pb-5 container px-4"
      >
        <h1 className="h1 text-center title-underline">プロジェクト</h1>
        <div className="mt-4">
          <ProjectItems projects={data.projects} />
        </div>
      </section>
    </>
  )
}

export default memo(Projects)
