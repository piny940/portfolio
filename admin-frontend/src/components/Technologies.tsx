import {
  useDeleteTechnologyMutation,
  useGetTechnologiesQuery,
} from '@/graphql/types'
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
import Link from 'next/link'
import { useMemo } from 'react'

export const Technologies = (): JSX.Element => {
  const context = useMemo(() => ({ additionalTypenames: ['Technology'] }), [])
  const [{ data, error }] = useGetTechnologiesQuery({ context })
  const [, deleteTechnology] = useDeleteTechnologyMutation()

  if (error) return <Error statusCode={400} />
  if (!data) return <>loading...</>
  return (
    <Box>
      <Typography variant="h4" component="h2">
        Technologies
      </Typography>
      <Box mt={2}>
        <Button
          component={Link}
          href="/technologies/new"
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
            <TableCell>Name</TableCell>
            <TableCell>LogoURL</TableCell>
            <TableCell>TagColor</TableCell>
            <TableCell>CreatedAt</TableCell>
            <TableCell>UpdatedAt</TableCell>
            <TableCell>Links</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.technologies.map((technology) => (
            <TableRow key={technology.id}>
              <TableCell>{technology.id}</TableCell>
              <TableCell>{technology.name}</TableCell>
              <TableCell>{technology.logoUrl}</TableCell>
              <TableCell>{technology.tagColor}</TableCell>
              <TableCell>{technology.createdAt}</TableCell>
              <TableCell>{technology.updatedAt}</TableCell>
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
                  href={`/technologies/${technology.id}/edit`}
                >
                  編集
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    void deleteTechnology({ id: technology.id })
                  }}
                >
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
