import { Blog } from '@/models/blogs'
// import BlogItem from './BlogItem'
import { memo } from 'react'

export type BlogItemsProps = {
  blogs: readonly Blog[]
}

const BlogItems = ({ blogs }: BlogItemsProps): JSX.Element => {
  return (
    <div className="row row-cols-lg-2 w-100 align-items-stretch">
      {blogs.map((blog) => (
        <div className="col-lg p-3 mb-3" key={blog.getTitle()}>
          {/* <BlogItem blog={blog} /> */}
        </div>
      ))}
    </div>
  )
}

export default memo(BlogItems)
