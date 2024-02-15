import Blogs from '@/containers/Blogs'
import Meta from '@/layouts/Meta'
import { PortfolioData, loadPortfolioData } from '@/loader/common'

type BlogsProps = {
  data: PortfolioData
}

export const getStaticProps = async (): Promise<{ props: BlogsProps }> => ({
  props: { data: await loadPortfolioData() },
})

const BlogsPage = ({ data }: BlogsProps): JSX.Element => {
  return (
    <>
      <Meta />
      <Blogs data={data} />
    </>
  )
}

export default BlogsPage
