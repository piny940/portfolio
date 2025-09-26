import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProjectEdit } from '@/components/ProjectEdit'
import { useGetProjectWithTagsQuery } from '@/graphql/types'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { JSX } from 'react'

const ProjectEditPage = (): JSX.Element => {
  const router = useRouter()
  const { projectId } = router.query

  const [{ data, error }] = useGetProjectWithTagsQuery({
    variables: { id: projectId as string },
    pause: !router.isReady,
  })

  const paths = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      {
        name: 'Edit Project',
        path: `/projects/${data?.project?.id}/edit`,
      },
    ],
    [data?.project?.id],
  )

  if (error) return <Error statusCode={404} />
  if (!data) return <>loading</>
  return (
    <>
      <Breadcrumbs paths={paths} />
      <ProjectEdit project={data.project} />
    </>
  )
}

export default ProjectEditPage
