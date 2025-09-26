import { TechStackEdit } from '@/components/TechStackEdit'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useGetTechStackQuery } from '@/graphql/types'
import { JSX } from 'react'

const TechStackEditPage = (): JSX.Element => {
  const router = useRouter()
  const { techStackId } = router.query

  const [{ data, error }] = useGetTechStackQuery({
    variables: { id: parseInt(techStackId as string) },
    pause: !router.isReady,
  })
  const paths = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'TechStacks', path: '/tech_stacks' },
      {
        name: 'Edit TechStack',
        path: `/tech_stacks/${data?.techStack?.id}/edit`,
      },
    ],
    [data?.techStack?.id],
  )

  if (error) return <Error statusCode={404} />
  if (!data) return <>loading</>
  return (
    <>
      <Breadcrumbs paths={paths} />
      <TechStackEdit techStack={data.techStack} />
    </>
  )
}

export default TechStackEditPage
