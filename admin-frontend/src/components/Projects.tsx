import { useDeleteProjectMutation, useGetProjectsQuery } from '@/graphql/types'
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

export const Projects = (): JSX.Element => {
  const context = useMemo(() => ({ additionalTypenames: ['Project'] }), [])
  const [{ data, error }] = useGetProjectsQuery({ context })
  const [, deleteProject] = useDeleteProjectMutation()

  if (error) return <Error statusCode={400} />
  if (!data) return <>loading...</>
  return (
    <Box>
      <Typography variant="h4" component="h2">
        Projects
      </Typography>
      <Box mt={2}>
        <Button
          component={Link}
          href="/projects/new"
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
            <TableCell>Description</TableCell>
            <TableCell>IsFavorite</TableCell>
            <TableCell>CreatedAt</TableCell>
            <TableCell>UpdatedAt</TableCell>
            <TableCell>Links</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.id}</TableCell>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{project.isFavorite ? 'true' : 'false'}</TableCell>
              <TableCell>{project.createdAt}</TableCell>
              <TableCell>{project.updatedAt}</TableCell>
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
                  href={`/projects/${project.id}/edit`}
                >
                  編集
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    void deleteProject({ id: project.id })
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
