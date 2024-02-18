import type { NextPage } from 'next'
import { Index } from '../containers/Index'
import { PortfolioData, loadPortfolioData } from '@/server/common'
import Meta from '@/layouts/Meta'

type HomeProps = {
  data: PortfolioData
}

export const getServerSideProps = async (): Promise<{ props: HomeProps }> => {
  return {
    props: { data: await loadPortfolioData() },
  }
}
const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <>
      <Meta />
      <Index data={data} />
    </>
  )
}

export default Home
