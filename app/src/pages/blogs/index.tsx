import Blogs from '@/containers/Blogs'
import { PortfolioData, loadPortfolioData } from '@/loader/common'

type BlogsProps = {
  data: PortfolioData
}

export const getStaticProps = async (): Promise<{ props: BlogsProps }> => ({
  props: { data: await loadPortfolioData() },
})

const BlogsPage = ({ data }: BlogsProps): JSX.Element => {
  return <Blogs data={data} />
}

export default BlogsPage
