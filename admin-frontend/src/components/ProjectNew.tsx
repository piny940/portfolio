import { Box, Typography } from '@mui/material'
import { ProjectForm } from './ProjectForm'
import { ProjectInput, useCreateProjectMutation } from '@/graphql/types'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

export const ProjectNew = (): JSX.Element => {
  const { handleSubmit, getValues, control } = useForm<ProjectInput>({
    defaultValues: { id: '', title: '', description: '', isFavorite: false },
  })
  const [, createProject] = useCreateProjectMutation()
  const router = useRouter()

  const submit = async () => {
    const { error } = await createProject({ input: getValues() })
    if (error != null) return
    void router.push('/projects')
  }

  return (
    <Box>
      <Typography variant="h4" component="h1">
        NewProject
      </Typography>
      <ProjectForm control={control} submit={handleSubmit(submit)} />
    </Box>
  )
}
