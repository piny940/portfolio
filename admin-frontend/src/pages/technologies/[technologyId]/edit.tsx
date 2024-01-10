import { EditTechnology } from '@/components/EditTechnology'
import { useGetTechnologyQuery } from '@/graphql/types'
import Error from 'next/error'
import { useRouter } from 'next/router'

const EditTechnologyPage = (): JSX.Element => {
  const router = useRouter()
  const { technologyId } = router.query

  const [{ data, error }] = useGetTechnologyQuery({
    variables: { id: parseInt(technologyId as string) },
    pause: !router.isReady,
  })

  if (error) return <Error statusCode={404} />
  if (!data) return <>loading</>
  return <EditTechnology technology={data.technology} />
}

export default EditTechnologyPage
