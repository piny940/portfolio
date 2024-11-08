import { Blogs } from '@/components/Blogs'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Suspense } from 'react'

const BlogsPage = (): JSX.Element => {
  const paths = [
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/blogs' },
  ]
  return (
    <>
      <Breadcrumbs paths={paths} />
      <Suspense>
        <Blogs />
      </Suspense>
    </>
  )
}

export default BlogsPage
