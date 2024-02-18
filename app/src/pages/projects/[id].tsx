import { ProjectShow } from '@/containers/Project'
import Meta from '@/layouts/Meta'
import { PortfolioData, getPortfolioData } from '@/server/common'
import { useRouter } from 'next/router'

type ProjectProps = {
  data: PortfolioData
}

export const getServerSideProps = async (): Promise<{
  props: ProjectProps
}> => {
  return {
    props: { data: await getPortfolioData() },
  }
}

const Project = ({ data }: ProjectProps): JSX.Element => {
  const router = useRouter()
  const id = router.query.id as string
  return (
    <>
      <Meta />
      <ProjectShow id={id} data={data} />
    </>
  )
}

export default Project
