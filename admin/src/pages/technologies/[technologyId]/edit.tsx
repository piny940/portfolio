import { Breadcrumbs } from '@/components/Breadcrumbs'
import { TechnologyEdit } from '@/components/TechnologyEdit'
import { useGetTechnologyQuery } from '@/graphql/types'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

const TechnologyEditPage = (): JSX.Element => {
  const router = useRouter()
  const { technologyId } = router.query

  const [{ data, error }] = useGetTechnologyQuery({
    variables: { id: parseInt(technologyId as string) },
    pause: !router.isReady,
  })
  const paths = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Technologies', path: '/technologies' },
      {
        name: 'Edit Technology',
        path: `/technologies/${data?.technology?.id}/edit`,
      },
    ],
    [data?.technology?.id],
  )

  if (error) return <Error statusCode={404} />
  if (!data) return <>loading</>
  return (
    <>
      <Breadcrumbs paths={paths} />
      <TechnologyEdit technology={data.technology} />
    </>
  )
}

export default TechnologyEditPage
