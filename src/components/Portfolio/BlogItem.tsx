import { Blog } from '@/models/blogs'
import { TestID } from '@/resources/TestID'
import { memo } from 'react'
import styled from 'styled-components'
import Badge from './Badge'

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
      <h3 className="h4">{blog.getTitle()}</h3>
      <ul className="list-unstyled mt-2 mb-1 d-flex">
        {blog.getTechnologies().map((tech) => (
          <li className="me-3" key={tech.getId()}>
            <Badge
              color={tech.getTagColor()}
              label={`#${tech.getName()}`}
              size={17}
            />
          </li>
        ))}
      </ul>
    </BlogItemDiv>
  )
}

export default memo(BlogItem)
