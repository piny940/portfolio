import Skills from '@/containers/Skills'
import Meta from '@/layouts/Meta'
import { PortfolioData, getPortfolioData } from '@/server/common'

type SkillsProps = {
  data: PortfolioData
}

export const getServerSideProps = async (): Promise<{
  props: SkillsProps
}> => ({
  props: { data: await getPortfolioData() },
})

const SkillsPage = ({ data }: SkillsProps): JSX.Element => {
  return (
    <>
      <Meta />
      <Skills data={data} />
    </>
  )
}

export default SkillsPage
