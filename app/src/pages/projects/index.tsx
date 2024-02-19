import Breadcrumb from '@/components/Common/Breadcrumb'
import ProjectItems from '@/components/Portfolio/ProjectItems'
import Meta from '@/layouts/Meta'
import { Project } from '@/server/_types'
import { sdk } from '@/server/api'
import { getProjectIdsWithBlog } from '@/server/loader'
import { GetServerSideProps } from 'next'

type ProjectsProps = {
  projects: Project[]
  projectIdsWithBlog: string[]
}

export const getServerSideProps: GetServerSideProps<
  ProjectsProps
> = async () => ({
  props: {
    projects: (await sdk.fetchProjects()).projects,
    projectIdsWithBlog: getProjectIdsWithBlog(),
  },
})

const ProjectsPage = ({
  projects,
  projectIdsWithBlog,
}: ProjectsProps): JSX.Element => {
  const paths = [
    { name: 'トップページ', path: '/' },
    { name: 'プロジェクト', path: '/projects' },
  ]

  return (
    <>
      <Meta />
      <div className="container pt-3">
        <Breadcrumb paths={paths} />
        <section
          id="projects"
          className="d-flex align-items-center flex-column row-gap-3 row-gap-md-5"
        >
          <h1 className="h1 title-underline px-1">プロジェクト</h1>
          <ProjectItems
            projectIdsWithBlog={projectIdsWithBlog}
            projects={projects}
          />
        </section>
      </div>
    </>
  )
}

export default ProjectsPage
