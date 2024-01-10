import { Box, Typography } from '@mui/material'
import { ProjectForm } from './ProjectForm'
import { useForm } from 'react-hook-form'
import {
  Project,
  ProjectInput,
  useUpdateProjectMutation,
} from '@/graphql/types'
import { useRouter } from 'next/router'

export type EditProjectProps = {
  project: Project
}

export const EditProject = ({ project }: EditProjectProps): JSX.Element => {
  const { getValues, control, handleSubmit } = useForm<ProjectInput>({
    defaultValues: {
      id: project.id,
      title: project.title,
      description: project.description,
      isFavorite: project.isFavorite,
    },
  })
  const [, updateProject] = useUpdateProjectMutation()
  const router = useRouter()

  const submit = async () => {
    const { error } = await updateProject({
      input: getValues(),
    })
    if (error) return
    void router.push('/projects')
  }

  return (
    <Box>
      <Typography variant="h4" component="h1">
        Edit Project{project.id}
      </Typography>
      <ProjectForm control={control} submit={handleSubmit(submit)} />
    </Box>
  )
}
