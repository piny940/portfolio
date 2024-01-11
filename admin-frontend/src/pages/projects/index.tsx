import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Projects } from '@/components/Projects'
import { useMemo } from 'react'

const ProjectsPage = (): JSX.Element => {
  const paths = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
    ],
    []
  )
  return (
    <>
      <Breadcrumbs paths={paths} />
      <Projects />
    </>
  )
}

export default ProjectsPage
