import { TechStacks } from '@/components/TechStacks'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { useMemo } from 'react'
import { JSX } from 'react'

const TechStacksPage = (): JSX.Element => {
  const paths = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'TechStacks', path: '/tech_stacks' },
    ],
    [],
  )
  return (
    <>
      <Breadcrumbs paths={paths} />
      <TechStacks />
    </>
  )
}

export default TechStacksPage
