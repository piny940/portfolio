import { EditProject } from '@/components/EditProject'
import { useGetProjectQuery } from '@/graphql/types'
import Error from 'next/error'
import { useRouter } from 'next/router'

const EditProjectPage = (): JSX.Element => {
  const router = useRouter()
  const { projectId } = router.query

  const [{ data, error }] = useGetProjectQuery({
    variables: { id: projectId as string },
    pause: !router.isReady,
  })

  if (error) return <Error statusCode={404} />
  if (!data) return <>loading</>
  return <EditProject project={data.project} />
}

export default EditProjectPage
