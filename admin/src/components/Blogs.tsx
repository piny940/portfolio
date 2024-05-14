import { useDeleteBlogMutation, useGetBlogsQuery } from '@/graphql/types'
import {
  Box,
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Error from 'next/error'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'
import { BlogKind, blogKindLabel } from '../../utils/types'
import { dateLabel } from '../../utils/helpers'
import { useRouter } from 'next/router'
import { Stack } from '@mui/system'

export const Blogs = (): JSX.Element => {
  const LIMIT = 20
  const context = useMemo(() => ({ additionalTypenames: ['Blog'] }), [])
  const [, deleteBlog] = useDeleteBlogMutation()
  const router = useRouter()
  const page = useMemo(() => {
    const page = router.query.page
    if (typeof page === 'string') {
      return parseInt(page)
    }
    return 1
  }, [router.query.page])
  const [{ data, error }] = useGetBlogsQuery({
    context,
    variables: { opt: { limit: LIMIT, offset: LIMIT * (page - 1) } },
  })

  const changePage = useCallback(
    (page: number) => {
      void router.push({
        pathname: router.pathname,
        query: { ...router.query, page },
      })
    },
    [router]
  )

  if (error) return <Error statusCode={400} />
  if (!data) return <>loading...</>
  return (
    <Box>
      <Typography variant="h4" component="h2">
        Blogs
      </Typography>
      <Box mt={2}>
        <Button
          component={Link}
          href="/blogs/new"
          fullWidth
          variant="contained"
        >
          新規作成
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Url</TableCell>
            <TableCell>Kind</TableCell>
            <TableCell>PublishedAt</TableCell>
            <TableCell>CreatedAt</TableCell>
            <TableCell>UpdatedAt</TableCell>
            <TableCell>Links</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.blogs.items.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>{blog.id}</TableCell>
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.url}</TableCell>
              <TableCell>{blogKindLabel[blog.kind as BlogKind]}</TableCell>
              <TableCell>{dateLabel(blog.publishedAt)}</TableCell>
              <TableCell>{dateLabel(blog.createdAt)}</TableCell>
              <TableCell>{dateLabel(blog.updatedAt)}</TableCell>
              <TableCell
                sx={{
                  '> * + *': {
                    marginLeft: 1,
                  },
                }}
              >
                <Button
                  variant="contained"
                  component={Link}
                  size="small"
                  href={`/blogs/${blog.id}/edit`}
                >
                  編集
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    void deleteBlog({ id: blog.id })
                  }}
                >
                  削除
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack mt={2} alignItems="center">
        <Pagination
          count={Math.ceil(data.blogs.totalCount / LIMIT)}
          page={page}
          onChange={(_, page) => changePage(page)}
        />
      </Stack>
    </Box>
  )
}
