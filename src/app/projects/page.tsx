import Breadcrumb from '@/components/Common/Breadcrumb'
import ProjectItems from '@/components/Portfolio/ProjectItems'
import { getProjectIdsWithBlog, getProjects } from '@/content'
import { JSX } from 'react'

const ProjectsPage = (): JSX.Element => {
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
        <ProjectItems
          projectIdsWithBlog={getProjectIdsWithBlog()}
          projects={getProjects()}
        />
      </section>
    </div>
  )
}

export default ProjectsPage
