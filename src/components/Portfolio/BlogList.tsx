'use client'

import BlogItems from '@/components/Portfolio/BlogItems'
import { Paging } from '@/components/Common/Paging'
import { Blog } from '@/content/types'
import { JSX, useMemo, useState } from 'react'

export type BlogListProps = {
  blogs: Blog[]
}

const LIMIT = 20

export const BlogList = ({ blogs }: BlogListProps): JSX.Element => {
  const [page, setPage] = useState(1)
  const shownBlogs = useMemo(
    () => blogs.slice(LIMIT * (page - 1), LIMIT * page),
    [blogs, page],
  )

  return (
    <>
      <BlogItems blogs={shownBlogs} />
      <Paging
        setPageNumber={setPage}
        currentPage={page}
        totalPages={Math.ceil(blogs.length / LIMIT)}
      />
    </>
  )
}
