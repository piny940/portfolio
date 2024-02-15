import Projects from '@/containers/Projects'
import Meta from '@/layouts/Meta'
import { PortfolioData, loadPortfolioData } from '@/loader/common'

type ProjectsProps = {
  data: PortfolioData
}

export const getStaticProps = async (): Promise<{ props: ProjectsProps }> => ({
  props: { data: await loadPortfolioData() },
})

const ProjectsPage = ({ data }: ProjectsProps): JSX.Element => {
  return (
    <>
      <Meta />
      <Projects data={data} />
    </>
  )
}

export default ProjectsPage
