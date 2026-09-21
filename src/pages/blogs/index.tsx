import Breadcrumb from '@/components/Common/Breadcrumb'
import BlogItems from '@/components/Portfolio/BlogItems'
import Meta from '@/layouts/Meta'
import { Blog } from '@/content/types'
import { getBlogs } from '@/content'
import { GetStaticProps } from 'next'
import { Paging } from '@/components/Common/Paging'
import { JSX, useMemo, useState } from 'react'

interface BlogsProps {
  blogs: Blog[]
}

const LIMIT = 20

export const getStaticProps: GetStaticProps<BlogsProps> = async () => {
  return { props: { blogs: getBlogs() } }
}

const BlogsPage = ({ blogs }: BlogsProps): JSX.Element => {
  const paths = [
    { name: 'トップページ', path: '/' },
    { name: 'ブログ一覧', path: '/blogs' },
  ]
  const [page, setPage] = useState(1)
  const shownBlogs = useMemo(
    () => blogs.slice(LIMIT * (page - 1), LIMIT * page),
    [blogs, page],
  )

  return (
    <>
      <Meta />
      <div className="container pt-3">
        <Breadcrumb paths={paths} />
        <section
          id="blogs"
          className="d-flex flex-column align-items-center row-gap-3 row-gap-md-5"
        >
          <h1 className="h1 text-center title-underline px-1">ブログ一覧</h1>
          <BlogItems blogs={shownBlogs} />
          <Paging
            setPageNumber={setPage}
            currentPage={page}
            totalPages={Math.ceil(blogs.length / LIMIT)}
          />
        </section>
      </div>
    </>
  )
}

export default BlogsPage
