import { ProjectEdit } from '@/components/ProjectEdit'
import { useGetProjectWithTagsQuery } from '@/graphql/types'
import Error from 'next/error'
import { useRouter } from 'next/router'

const ProjectEditPage = (): JSX.Element => {
  const router = useRouter()
  const { projectId } = router.query

  const [{ data, error }] = useGetProjectWithTagsQuery({
    variables: { id: projectId as string },
    pause: !router.isReady,
  })

  if (error) return <Error statusCode={404} />
  if (!data) return <>loading</>
  return <ProjectEdit project={data.project} />
}

export default ProjectEditPage
