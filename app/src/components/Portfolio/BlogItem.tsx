import { TestID } from '@/resources/TestID'
import { memo } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import TechnologyTag from './TechnologyTag'
import { Blog } from '@/resources/types'

const BlogItemDiv = styled.div`
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
      <Link href={blog.url} target="_blank" className="unstyled">
        <h3 className="h4">{blog.title}</h3>
      </Link>
      <ul className="list-unstyled mt-2 mb-1 d-flex flex-wrap">
        {blog.tags.map((tag) => (
          <li className="me-3 mt-1" key={tag.id}>
            <TechnologyTag technology={tag} size={17} />
          </li>
        ))}
      </ul>
    </BlogItemDiv>
  )
}

export default memo(BlogItem)
