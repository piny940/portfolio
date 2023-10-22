import Projects from '@/containers/Projects'
import { DataController, PortfolioData } from '@/controllers/data_controller'

type ProjectsProps = {
  data: PortfolioData
}

export const getStaticProps = async (): Promise<{ props: ProjectsProps }> => ({
  props: { data: new DataController().getPortfolioData() },
})

const ProjectsPage = ({ data }: ProjectsProps): JSX.Element => {
  return <Projects data={data} />
}

export default ProjectsPage
