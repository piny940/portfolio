'use client'

import BlogItems from '@/components/Portfolio/BlogItems'
import { Paging } from '@/components/Common/Paging'
import { Blog } from '@/content/types'
import { JSX, useMemo, useState } from 'react'

export type BlogListProps = {
  blogs: Blog[]
  limit?: number
}

const DEFAULT_LIMIT = 20

export const BlogList = ({
  blogs,
  limit = DEFAULT_LIMIT,
}: BlogListProps): JSX.Element => {
  const [page, setPage] = useState(1)
  const shownBlogs = useMemo(
    () => blogs.slice(limit * (page - 1), limit * page),
    [blogs, page, limit],
  )

  return (
    <>
      <BlogItems blogs={shownBlogs} />
      <Paging
        setPageNumber={setPage}
        currentPage={page}
        totalPages={Math.ceil(blogs.length / limit)}
      />
    </>
  )
}
