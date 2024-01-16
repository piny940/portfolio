import Projects from '@/containers/Projects'
import { PortfolioData, loadPortfolioData } from '@/loader/common'

type ProjectsProps = {
  data: PortfolioData
}

export const getStaticProps = async (): Promise<{ props: ProjectsProps }> => ({
  props: { data: await loadPortfolioData() },
})

const ProjectsPage = ({ data }: ProjectsProps): JSX.Element => {
  return <Projects data={data} />
}

export default ProjectsPage
