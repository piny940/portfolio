import Skill from '@/containers/Skill'
import { DataController, PortfolioData } from '@/controllers/data_controller'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

type SkillProps = {
  data: PortfolioData
}

export const getStaticProps = async (): Promise<{ props: SkillProps }> => {
  const dataController = new DataController()
  const data = dataController.getPortfolioData()

  return {
    props: { data },
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
  return <Skill id={id} data={data} />
}

export default SkillPage
