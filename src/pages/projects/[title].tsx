import { ProjectShow } from '@/containers/Project'
import { DataController, PortfolioData } from '@/controllers/data_controller'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

type ProjectProps = {
  data: PortfolioData
}

export const getStaticProps = async (): Promise<{ props: ProjectProps }> => {
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

const Project = ({ data }: ProjectProps): JSX.Element => {
  const router = useRouter()
  const title = router.query.title as string
  return <ProjectShow title={title} data={data} />
}

export default Project
