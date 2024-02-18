import { ProjectShow } from '@/containers/Project'
import Meta from '@/layouts/Meta'
import { PortfolioData, loadPortfolioData } from '@/loader/common'
import { useRouter } from 'next/router'

type ProjectProps = {
  data: PortfolioData
}

export const getServerSideProps = async (): Promise<{
  props: ProjectProps
}> => {
  return {
    props: { data: await loadPortfolioData() },
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
