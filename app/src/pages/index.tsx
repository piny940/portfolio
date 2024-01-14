import type { NextPage } from 'next'
import { Index } from '../containers/Index'
import { DataController, PortfolioData } from '@/controllers/data_controller'
import { loadPortfolioData } from '@/loader/common'

type HomeProps = {
  data: PortfolioData
}

export const getStaticProps = async (): Promise<{ props: HomeProps }> => {
  void loadPortfolioData()
  return {
    props: { data: await new DataController().getPortfolioData() },
  }
}
const Home: NextPage<HomeProps> = ({ data }) => {
  return <Index data={data} />
}

export default Home
