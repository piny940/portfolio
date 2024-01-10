import { TechnologyEdit } from '@/components/TechnologyEdit'
import { useGetTechnologyQuery } from '@/graphql/types'
import Error from 'next/error'
import { useRouter } from 'next/router'

const TechnologyEditPage = (): JSX.Element => {
  const router = useRouter()
  const { technologyId } = router.query

  const [{ data, error }] = useGetTechnologyQuery({
    variables: { id: parseInt(technologyId as string) },
    pause: !router.isReady,
  })

  if (error) return <Error statusCode={404} />
  if (!data) return <>loading</>
  return <TechnologyEdit technology={data.technology} />
}

export default TechnologyEditPage
