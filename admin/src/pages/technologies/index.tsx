import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Technologies } from '@/components/Technologies'
import { useMemo } from 'react'

const TechnologiesPage = (): JSX.Element => {
  const paths = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Technologies', path: '/technologies' },
    ],
    []
  )
  return (
    <>
      <Breadcrumbs paths={paths} />
      <Technologies />
    </>
  )
}

export default TechnologiesPage
