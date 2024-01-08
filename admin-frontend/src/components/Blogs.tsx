import { useGetBlogsQuery } from '@/graphql/types'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import Error from 'next/error'

export const Blogs = (): JSX.Element => {
  const [{ data, error }] = useGetBlogsQuery()

  if (error) return <Error statusCode={400} />
  if (!data) return <>loading...</>
  return (
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
            <TableCell>
              <Button href={`/blogs/${blog.id}/edit`}>編集</Button>
              <Button>削除</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
