import Skills from '@/containers/Skills'
import { DataController, PortfolioData } from '@/controllers/data_controller'

type SkillsProps = {
  data: PortfolioData
}

export const getStaticProps = async (): Promise<{ props: SkillsProps }> => ({
  props: { data: new DataController().getPortfolioData() },
})

const SkillsPage = ({ data }: SkillsProps): JSX.Element => {
  return <Skills data={data} />
}

export default SkillsPage
