import type { NextPage } from 'next'
import { Index } from '../containers/Index'
import { PortfolioData, getPortfolioData } from '@/server/common'
import Meta from '@/layouts/Meta'

type HomeProps = {
  data: PortfolioData
}

export const getServerSideProps = async (): Promise<{ props: HomeProps }> => {
  return {
    props: { data: await getPortfolioData() },
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
