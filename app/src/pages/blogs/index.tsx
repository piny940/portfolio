import Blogs from '@/containers/Blogs'
import { DataController, PortfolioData } from '@/controllers/data_controller'

type BlogsProps = {
  data: PortfolioData
}

export const getStaticProps = async (): Promise<{ props: BlogsProps }> => ({
  props: { data: new DataController().getPortfolioData() },
})

const BlogsPage = ({ data }: BlogsProps): JSX.Element => {
  return <Blogs data={data} />
}

export default BlogsPage
