import { BlogNew } from '@/components/BlogNew'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { useMemo } from 'react'

const BlogNewPage = (): JSX.Element => {
  const paths = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Blogs', path: '/blogs' },
      {
        name: 'New Blog',
        path: `/blogs/new`,
      },
    ],
    []
  )
  return (
    <>
      <Breadcrumbs paths={paths} />
      <BlogNew />
    </>
  )
}

export default BlogNewPage
