import {
  Project,
  useDeleteProjectMutation,
  useGetProjectsQuery,
} from '@/graphql/types'
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Error from 'next/error'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { dateLabel } from '../../utils/helpers'
import { CSS } from '@dnd-kit/utilities'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers'

type ProjectType = Pick<
  Project,
  | 'id'
  | 'title'
  | 'description'
  | 'isFavorite'
  | 'createdAt'
  | 'updatedAt'
  | 'position'
>
export const Projects = (): JSX.Element => {
  const context = useMemo(() => ({ additionalTypenames: ['Project'] }), [])
  const [{ data, error }] = useGetProjectsQuery({ context })
  const [, deleteProject] = useDeleteProjectMutation()
  const [projects, setProjects] = useState<ProjectType[]>()

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setProjects((projects) => {
        if (!projects) return
        const ids = projects.map((project) => project.id)
        const oldIndex = ids.indexOf(active.id as string)
        const newIndex = ids.indexOf(over.id as string)
        return arrayMove(projects, oldIndex, newIndex)
      })
    }
  }

  useEffect(() => {
    if (!data) return
    setProjects(data.projects)
  }, [data])

  if (error) return <Error statusCode={400} />
  if (!projects) return <>loading...</>
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
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[
          restrictToVerticalAxis,
          restrictToParentElement,
          restrictToParentElement,
        ]}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={projects}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>IsFavorite</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>CreatedAt</TableCell>
                <TableCell>UpdatedAt</TableCell>
                <TableCell>Links</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  deleteProject={() => {
                    void deleteProject({ id: project.id })
                  }}
                />
              ))}
            </TableBody>
          </Table>
        </SortableContext>
      </DndContext>
    </Box>
  )
}

type ProjectItemProps = {
  project: ProjectType
  deleteProject: () => void
}
const ProjectItem = ({ project, deleteProject }: ProjectItemProps) => {
  const { listeners, setNodeRef, transform, transition, attributes } =
    useSortable({
      id: project.id,
    })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <TableRow ref={setNodeRef} style={style} {...attributes}>
      <TableCell>
        <IconButton {...listeners}>
          <DragHandleIcon />
        </IconButton>
      </TableCell>
      <TableCell>{project.id}</TableCell>
      <TableCell>{project.title}</TableCell>
      <TableCell>{project.description}</TableCell>
      <TableCell>{project.isFavorite ? 'true' : 'false'}</TableCell>
      <TableCell>{project.position}</TableCell>
      <TableCell>{dateLabel(project.createdAt)}</TableCell>
      <TableCell>{dateLabel(project.updatedAt)}</TableCell>
      <TableCell
        sx={{
          '> *': {
            marginLeft: 1,
            marginTop: 1,
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
        <Button variant="contained" size="small" onClick={deleteProject}>
          削除
        </Button>
      </TableCell>
    </TableRow>
  )
}
