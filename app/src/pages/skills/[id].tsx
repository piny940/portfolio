import Skill from '@/containers/Skill'
import Meta from '@/layouts/Meta'
import { PortfolioData, loadPortfolioData } from '@/loader/common'
import { useRouter } from 'next/router'

type SkillProps = {
  data: PortfolioData
}

export const getServerSideProps = async (): Promise<{ props: SkillProps }> => {
  return {
    props: { data: await loadPortfolioData() },
  }
}

const SkillPage = ({ data }: SkillProps): JSX.Element => {
  const router = useRouter()
  const id = router.query.id as string
  return (
    <>
      <Meta />
      <Skill id={parseInt(id)} data={data} />
    </>
  )
}

export default SkillPage
