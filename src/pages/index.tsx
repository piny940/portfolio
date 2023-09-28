import type { NextPage } from 'next'
import { Index } from '../containers/Index'
import { DataController, PortfolioData } from '@/controllers/data_controller'

type HomeProps = {
  data: PortfolioData
}

export const getStaticProps = async (): Promise<{ props: HomeProps }> => {
  const dataController = new DataController()
  const data = dataController.getPortfolioData()

  return {
    props: { data },
  }
}

const Home: NextPage<HomeProps> = ({ data }) => {
  return <Index />
}

export default Home
