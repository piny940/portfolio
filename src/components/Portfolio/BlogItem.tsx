import { Blog } from '@/models/blogs'
import { memo } from 'react'
import styled from 'styled-components'

const BlogItemDiv = styled.div`
  min-width: 400px;
  max-width: 100%;
`
const BadgeSpan = styled.span`
  font-size: 17px;
`

export type BlogItemProps = {
  blog: Blog
}

const BlogItem = ({ blog }: BlogItemProps): JSX.Element => {
  return (
    <BlogItemDiv className="bg-body p-4 rounded border d-flex flex-column position-relative w-100 h-100 ">
      <h3 className="h4">{blog.getTitle()}</h3>
      <ul className="list-unstyled mt-2 mb-1 d-flex">
        <li className="me-3">
          <BadgeSpan className="badge bg-primary">#Next.js</BadgeSpan>
        </li>
        <li className="me-3">
          <BadgeSpan className="badge bg-primary">#React</BadgeSpan>
        </li>
        <li className="me-3">
          <BadgeSpan className="badge bg-primary">#TypeScript</BadgeSpan>
        </li>
      </ul>
    </BlogItemDiv>
  )
}

export default memo(BlogItem)
