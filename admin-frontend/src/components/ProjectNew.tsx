import { Box, Typography } from '@mui/material'
import { ProjectForm } from './ProjectForm'
import {
  ProjectInput,
  useCreateProjectMutation,
  useUpdateProjectTagsMutation,
} from '@/graphql/types'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { TechTagsFormFields } from './TechTagsEdit'

export const ProjectNew = (): JSX.Element => {
  const { handleSubmit, getValues, control } = useForm<ProjectInput>({
    defaultValues: { id: '', title: '', description: '', isFavorite: false },
  })
  const { getValues: getTagsValues, control: tagsControl } =
    useForm<TechTagsFormFields>({
      defaultValues: { tags: [] },
    })
  const [, createProject] = useCreateProjectMutation()
  const [, updateProjectTags] = useUpdateProjectTagsMutation()
  const router = useRouter()

  const submit = async () => {
    const { data, error } = await createProject({ input: getValues() })
    if (!data || error) return
    const { error: tagsError } = await updateProjectTags({
      id: data.createProject.id,
      tags: getTagsValues().tags.map((tag) => tag.id),
    })
    if (tagsError) return
    void router.push('/projects')
  }

  return (
    <Box>
      <Typography variant="h4" component="h1">
        NewProject
      </Typography>
      <ProjectForm
        tagsControl={tagsControl}
        control={control}
        submit={handleSubmit(submit)}
      />
    </Box>
  )
}
