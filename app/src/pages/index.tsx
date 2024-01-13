import type { NextPage } from 'next'
import { Index } from '../containers/Index'
import { DataController, PortfolioData } from '@/controllers/data_controller'

type HomeProps = {
  data: PortfolioData
}

export const getStaticProps = async (): Promise<{ props: HomeProps }> => ({
  props: { data: await new DataController().getPortfolioData() },
})

const Home: NextPage<HomeProps> = ({ data }) => {
  return <Index data={data} />
}

export default Home
