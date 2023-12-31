import { PortfolioData } from '@/controllers/data_controller'
import { PortfolioController } from '@/controllers/portfolio_controller'
import { memo } from 'react'
import BlogItems from '@/components/Portfolio/BlogItems'
import Breadcrumb from '@/components/Common/Breadcrumb'

export type BlogsProps = {
  data: PortfolioData
}

const Blogs = ({ data }: BlogsProps): JSX.Element => {
  const controller = new PortfolioController(data)
  const paths = [
    { name: 'トップページ', path: '/' },
    { name: 'ブログ一覧', path: '/blogs' },
  ]

  return (
    <>
      <Breadcrumb paths={paths} />
      <section
        id="blogs"
        className="d-flex flex-column align-items-center pb-5 container px-4"
      >
        <h1 className="h1 text-center title-underline">ブログ一覧</h1>
        <div className="mt-4">
          <BlogItems blogs={controller.blogs.sortedByDates()} />
        </div>
      </section>
    </>
  )
}

export default memo(Blogs)
