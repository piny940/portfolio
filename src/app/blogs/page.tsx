import Breadcrumb from '@/components/Common/Breadcrumb'
import { BlogList } from '@/components/Portfolio/BlogList'
import { getBlogs } from '@/content'
import { JSX } from 'react'

const BlogsPage = (): JSX.Element => {
  const paths = [
    { name: 'トップページ', path: '/' },
    { name: 'ブログ一覧', path: '/blogs' },
  ]

  return (
    <div className="container pt-3">
      <Breadcrumb paths={paths} />
      <section
        id="blogs"
        className="d-flex flex-column align-items-center row-gap-3 row-gap-md-5"
      >
        <h1 className="h1 text-center title-underline px-1">ブログ一覧</h1>
        <BlogList blogs={getBlogs()} />
      </section>
    </div>
  )
}

export default BlogsPage
