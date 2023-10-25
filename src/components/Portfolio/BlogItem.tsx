import { Blog } from '@/models/blogs'
import { TestID } from '@/resources/TestID'
import { memo } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import TechnologyTag from './TechnologyTag'

const BlogItemDiv = styled.div`
  min-width: 400px;
  max-width: 100%;
`

export type BlogItemProps = {
  blog: Blog
}

const BlogItem = ({ blog }: BlogItemProps): JSX.Element => {
  return (
    <BlogItemDiv
      data-testid={TestID.BLOG_ITEM}
      className="bg-body p-4 rounded border d-flex flex-column position-relative w-100 h-100 "
    >
      <Link href={blog.getLink()} target="_blank" className="unstyled">
        <h3 className="h4">{blog.getTitle()}</h3>
      </Link>
      <ul className="list-unstyled mt-2 mb-1 d-flex flex-wrap">
        {blog.getTechnologies().map((tech) => (
          <li className="me-3 mt-1" key={tech.getId()}>
            <TechnologyTag technology={tech} size={17} />
          </li>
        ))}
      </ul>
    </BlogItemDiv>
  )
}

export default memo(BlogItem)
