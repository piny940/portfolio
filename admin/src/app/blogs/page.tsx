import { Blogs } from '@/components/Blogs'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { useMemo } from 'react'

const BlogsPage = (): JSX.Element => {
  const paths = [
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/blogs' },
  ]
  return (
    <>
      <Breadcrumbs paths={paths} />
      <Blogs />
    </>
  )
}

export default BlogsPage
