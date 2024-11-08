'use client'
import {
  useDeleteTechStackMutation,
  useGetTechStacksQuery,
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
import { dateLabel } from '../../utils/helpers'

export const TechStacks = (): JSX.Element => {
  const context = useMemo(() => ({ additionalTypenames: ['TechStack'] }), [])
  const [{ data, error }] = useGetTechStacksQuery({ context })
  const [, deleteTechStack] = useDeleteTechStackMutation()

  if (error) return <Error statusCode={400} />
  if (!data) return <>loading...</>
  return (
    <Box>
      <Typography variant="h4" component="h2">
        TechStacks
      </Typography>
      <Box mt={2}>
        <Button
          component={Link}
          href="/tech_stacks/new"
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
            <TableCell>Technology</TableCell>
            <TableCell>Proficiency</TableCell>
            <TableCell>CreatedAt</TableCell>
            <TableCell>UpdatedAt</TableCell>
            <TableCell>Links</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.techStacks.map((techStack) => (
            <TableRow key={techStack.id}>
              <TableCell>{techStack.id}</TableCell>
              <TableCell>{techStack.technology.name}</TableCell>
              <TableCell>{techStack.proficiency}</TableCell>
              <TableCell>{dateLabel(techStack.createdAt)}</TableCell>
              <TableCell>{dateLabel(techStack.updatedAt)}</TableCell>
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
                  href={`/tech_stacks/${techStack.id}/edit`}
                >
                  編集
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    void deleteTechStack({ id: techStack.id })
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
