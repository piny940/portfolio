import Breadcrumb from '@/components/Common/Breadcrumb'
import BlogItems from '@/components/Portfolio/BlogItems'
import Meta from '@/layouts/Meta'
import { Blog } from '@/server/_types'
import { sdk } from '@/server/api'

type BlogsProps = {
  blogs: Blog[]
}

export const getServerSideProps = async (): Promise<{ props: BlogsProps }> => ({
  props: { blogs: (await sdk.fetchBlogs()).blogs },
})

const BlogsPage = ({ blogs }: BlogsProps): JSX.Element => {
  const paths = [
    { name: 'トップページ', path: '/' },
    { name: 'ブログ一覧', path: '/blogs' },
  ]

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
        </section>
      </div>
    </>
  )
}

export default BlogsPage
