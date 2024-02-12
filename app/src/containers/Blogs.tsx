import { memo } from 'react'
import BlogItems from '@/components/Portfolio/BlogItems'
import Breadcrumb from '@/components/Common/Breadcrumb'
import { Blog } from '@/resources/types'

export type BlogsProps = {
  data: {
    blogs: Blog[]
  }
}

const Blogs = ({ data }: BlogsProps): JSX.Element => {
  const paths = [
    { name: 'トップページ', path: '/' },
    { name: 'ブログ一覧', path: '/blogs' },
  ]

  return (
    <>
      <Breadcrumb paths={paths} />
      <section id="blogs" className="pb-5 container">
        <h1 className="h1 text-center">
          <span className="title-underline px-1">ブログ一覧</span>
        </h1>
        <div className="mt-5">
          <BlogItems blogs={data.blogs} />
        </div>
      </section>
    </>
  )
}

export default memo(Blogs)
