import { Breadcrumbs } from '@/components/Breadcrumbs'
import { TechnologyNew } from '@/components/TechnologyNew'
import { useMemo } from 'react'
import { JSX } from 'react'

const TechnologyNewPage = (): JSX.Element => {
  const paths = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Technologies', path: '/technologies' },
      {
        name: 'New Technology',
        path: `/technologies/new`,
      },
    ],
    [],
  )
  return (
    <>
      <Breadcrumbs paths={paths} />
      <TechnologyNew />
    </>
  )
}

export default TechnologyNewPage
