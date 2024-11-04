import Breadcrumb from '@/components/Common/Breadcrumb'
import BlogItems from '@/components/Portfolio/BlogItems'
import Meta from '@/layouts/Meta'
import { Blog } from '@/server/_types'
import { sdk } from '@/server/api'
import { PageProps } from '../_app'
import { getThemeFromCookie } from '@/server/helper'
import { GetServerSideProps } from 'next'
import { Paging } from '@/components/Common/Paging'
import { useRouter } from 'next/router'

interface BlogsProps extends PageProps {
  blogs: Blog[]
  totalCount: number
  page: number
}

const LIMIT = 20
export const getServerSideProps: GetServerSideProps<BlogsProps> = async (
  ctx
) => {
  const page = Number((ctx.query.page || '1') as string)
  const { blogs } = await sdk().fetchBlogs({
    opt: { limit: LIMIT, offset: LIMIT * (page - 1) },
  })
  return {
    props: {
      blogs: blogs.items,
      totalCount: blogs.totalCount,
      page,
      initialTheme: getThemeFromCookie(ctx),
    },
  }
}

const BlogsPage = ({ blogs, page, totalCount }: BlogsProps): JSX.Element => {
  const paths = [
    { name: 'トップページ', path: '/' },
    { name: 'ブログ一覧', path: '/blogs' },
  ]
  const router = useRouter()
  const setPageNumber = (page: number) => {
    void router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    })
  }

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
          <BlogItems blogs={blogs} />
          <Paging
            setPageNumber={setPageNumber}
            currentPage={page}
            totalPages={Math.ceil(totalCount / LIMIT)}
          />
        </section>
      </div>
    </>
  )
}

export default BlogsPage
