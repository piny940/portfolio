import { TechStackNew } from '@/components/TechStackNew'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { useMemo } from 'react'

const TechStackNewPage = (): JSX.Element => {
  const paths = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'TechStacks', path: '/tech_stacks' },
      {
        name: 'New TechStack',
        path: `/tech_stacks/new`,
      },
    ],
    []
  )
  return (
    <>
      <Breadcrumbs paths={paths} />
      <TechStackNew />
    </>
  )
}

export default TechStackNewPage
