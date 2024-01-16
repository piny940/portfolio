import type { NextPage } from 'next'
import { Index } from '../containers/Index'
import { PortfolioData, loadPortfolioData } from '@/loader/common'

type HomeProps = {
  data: PortfolioData
}

export const getStaticProps = async (): Promise<{ props: HomeProps }> => {
  return {
    props: { data: await loadPortfolioData() },
  }
}
const Home: NextPage<HomeProps> = ({ data }) => {
  return <Index data={data} />
}

export default Home
