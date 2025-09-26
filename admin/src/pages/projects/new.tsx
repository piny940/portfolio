import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProjectNew } from '@/components/ProjectNew'
import { useMemo } from 'react'

const ProjectNewPage = (): JSX.Element => {
  const paths = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: 'New Project', path: `/projects/new` },
    ],
    [],
  )
  return (
    <>
      <Breadcrumbs paths={paths} />
      <ProjectNew />
    </>
  )
}

export default ProjectNewPage
