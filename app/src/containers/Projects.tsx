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
      <div className="container pt-3">
        <Breadcrumb paths={paths} />
        <section id="projects" className="pb-5">
          <h1 className="h1 text-center">
            <span className="title-underline px-1">プロジェクト</span>
          </h1>
          <div className="mt-5">
            <ProjectItems projects={data.projects} />
          </div>
        </section>
      </div>
    </>
  )
}

export default memo(Projects)
