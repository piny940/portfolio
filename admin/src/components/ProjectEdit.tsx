'use client'
import { Box, Typography } from '@mui/material'
import { ProjectForm } from './ProjectForm'
import { useForm } from 'react-hook-form'
import {
  Project,
  ProjectInput,
  useUpdateProjectWithTagsMutation,
} from '@/graphql/types'
import { useRouter } from 'next/router'
import { TechTagsFormFields } from './TechTagsEdit'

export type ProjectEditProps = {
  project: Pick<
    Project,
    | 'id'
    | 'title'
    | 'description'
    | 'isFavorite'
    | 'tags'
    | 'appLink'
    | 'githubLink'
    | 'qiitaLink'
  >
}

export const ProjectEdit = ({ project }: ProjectEditProps): JSX.Element => {
  const { getValues, control, handleSubmit } = useForm<ProjectInput>({
    defaultValues: {
      id: project.id,
      title: project.title,
      description: project.description,
      isFavorite: project.isFavorite,
      appLink: project.appLink || '',
      githubLink: project.githubLink || '',
      qiitaLink: project.qiitaLink || '',
    },
  })
  const { getValues: getTagsValues, control: tagsControl }
    = useForm<TechTagsFormFields>({
      defaultValues: { tags: project.tags.map(t => t.technology) },
    })
  const [, updateProject] = useUpdateProjectWithTagsMutation()
  const router = useRouter()

  const submit = async () => {
    const { error } = await updateProject({
      id: project.id,
      input: getValues(),
      tags: getTagsValues().tags.map(tag => tag.id),
    })
    if (error) return
    void router.push('/projects')
  }

  return (
    <Box>
      <Typography variant="h4" component="h1">
        Edit Project
        {project.id}
      </Typography>
      <ProjectForm
        isEdit={true}
        tagsControl={tagsControl}
        control={control}
        submit={handleSubmit(submit)}
      />
    </Box>
  )
}
