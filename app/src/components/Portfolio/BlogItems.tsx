import { Blog } from '@/server/_types'
import BlogItem from './BlogItem'
import { memo } from 'react'

export type BlogItemsProps = {
  blogs: Blog[]
}

const BlogItems = ({ blogs }: BlogItemsProps): JSX.Element => {
  return (
    <div className="row row-cols-1 row-cols-lg-2 gy-4">
      {blogs.map((blog) => (
        <div className="col" key={blog.id}>
          <BlogItem key={blog.id} blog={blog} />
        </div>
      ))}
    </div>
  )
}

export default memo(BlogItems)
