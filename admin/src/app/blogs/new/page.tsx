import { BlogNew } from '@/components/BlogNew'
import { Breadcrumbs } from '@/components/Breadcrumbs'

const BlogNewPage = (): JSX.Element => {
  const paths = [
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/blogs' },
    {
      name: 'New Blog',
      path: `/blogs/new`,
    },
  ]
  return (
    <>
      <Breadcrumbs paths={paths} />
      <BlogNew />
    </>
  )
}

export default BlogNewPage
