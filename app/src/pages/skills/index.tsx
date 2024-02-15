import Skills from '@/containers/Skills'
import Meta from '@/layouts/Meta'
import { PortfolioData, loadPortfolioData } from '@/loader/common'

type SkillsProps = {
  data: PortfolioData
}

export const getStaticProps = async (): Promise<{ props: SkillsProps }> => ({
  props: { data: await loadPortfolioData() },
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
