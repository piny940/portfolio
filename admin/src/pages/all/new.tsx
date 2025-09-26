import { AllNew } from '@/components/AllNew'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { useMemo } from 'react'
import { JSX } from 'react'

const NewAllPage = (): JSX.Element => {
  const paths = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'All', path: '/all' },
      { name: 'New All', path: '/all/new' },
    ],
    [],
  )
  return (
    <>
      <Breadcrumbs paths={paths} />
      <AllNew />
    </>
  )
}

export default NewAllPage
