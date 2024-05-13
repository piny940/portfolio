import { AllShow } from '@/components/AllShow'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { useMemo } from 'react'

const AllPage = () => {
  const paths = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'All', path: '/all' },
    ],
    []
  )
  return (
    <>
      <Breadcrumbs paths={paths} />
      <AllShow />
    </>
  )
}

export default AllPage
