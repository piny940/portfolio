import { useGetBlogsQuery } from '@/graphql/types'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Error from 'next/error'

export const Blogs = (): JSX.Element => {
  const [{ data, error }] = useGetBlogsQuery()

  if (error) return <Error statusCode={400} />
  if (!data) return <>loading...</>
  return (
    <Box>
      <Typography variant="h4" component="h2">
        Blogs
      </Typography>
      <Box mt={2}>
        <Button href="/blogs/new" fullWidth variant="contained">
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
            <TableCell>CreatedAt</TableCell>
            <TableCell>UpdatedAt</TableCell>
            <TableCell>Links</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>{blog.id}</TableCell>
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.url}</TableCell>
              <TableCell>{blog.kind}</TableCell>
              <TableCell>{blog.createdAt}</TableCell>
              <TableCell>{blog.updatedAt}</TableCell>
              <TableCell
                sx={{
                  '> * + *': {
                    marginLeft: 1,
                  },
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  href={`/blogs/${blog.id}/edit`}
                >
                  編集
                </Button>
                <Button variant="contained" size="small">
                  削除
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}
