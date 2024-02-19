import Breadcrumb from '@/components/Common/Breadcrumb'
import ProjectItems from '@/components/Portfolio/ProjectItems'
import Meta from '@/layouts/Meta'
import { Project } from '@/server/_types'
import { getProjects } from '@/server/api'

type ProjectsProps = {
  projects: Project[]
}

export const getServerSideProps = async (): Promise<{
  props: ProjectsProps
}> => ({
  props: {
    projects: await getProjects(),
  },
})

const ProjectsPage = ({ projects }: ProjectsProps): JSX.Element => {
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
          <ProjectItems projects={projects} />
        </section>
      </div>
    </>
  )
}

export default ProjectsPage
