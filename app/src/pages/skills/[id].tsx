import Skill from '@/containers/Skill'
import { PortfolioData, loadPortfolioData } from '@/loader/common'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

type SkillProps = {
  data: PortfolioData
}

export const getStaticProps = async (): Promise<{ props: SkillProps }> => {
  return {
    props: { data: await loadPortfolioData() },
  }
}
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

const SkillPage = ({ data }: SkillProps): JSX.Element => {
  const router = useRouter()
  const id = router.query.id as string
  return <Skill id={parseInt(id)} data={data} />
}

export default SkillPage
