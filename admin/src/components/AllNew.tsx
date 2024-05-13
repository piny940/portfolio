import {
  Blog,
  Project,
  TechStack,
  Technology,
  useCreateBlogMutation,
  useCreateProjectMutation,
  useCreateTechStackMutation,
  useCreateTechnologyMutation,
  useUpdateBlogTagsMutation,
  useUpdateProjectTagsMutation,
} from '@/graphql/types'
import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import { ProcessingModal } from './ProcessingModal'

type AllInput = {
  json: string
}
export const AllNew = (): JSX.Element => {
  const requiredRule = { required: 'このフィールドは必須です。' }
  const [dialogOpen, setDialogOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [progress, setProgress] = useState(0)

  const { handleSubmit, getValues, control } = useForm<AllInput>({
    defaultValues: {
      json: '',
    },
  })
  const [, createBlog] = useCreateBlogMutation()
  const [, updateBlogTags] = useUpdateBlogTagsMutation()
  const [, createProject] = useCreateProjectMutation()
  const [, updateProjectTags] = useUpdateProjectTagsMutation()
  const [, createTechStack] = useCreateTechStackMutation()
  const [, createTechnology] = useCreateTechnologyMutation()

  const submit = async () => {
    const { json } = getValues()
    let data
    try {
      data = JSON.parse(json)
    } catch (e) {
      if (e instanceof Error) {
        setMessage(e.message)
      }
      console.error(e)
      return
    }
    if (!data) return
    const blogs = (data.blogs || []) as Blog[]
    const projects = (data.projects || []) as Project[]
    const techStacks = (data.techStacks || []) as TechStack[]
    const technologies = (data.technologies || []) as Technology[]
    const allCount =
      blogs.length + projects.length + techStacks.length + technologies.length
    let count = 0
    setDialogOpen(true)
    setProgress(0)
    setErrors([])
    console.log('technologies: ', technologies)
    for (const technology of technologies) {
      try {
        await createTechnology({
          input: {
            name: technology.name,
            logoUrl: technology.logoUrl,
            tagColor: technology.tagColor,
          },
        })
      } catch (e) {
        console.error(e)
        if (e instanceof Error) {
          setErrors((prev) => [...prev, e.message])
        }
      }
      count++
      setProgress((count / allCount) * 100)
    }
    console.log('techStacks: ', techStacks)
    for (const techStack of techStacks) {
      const { error } = await createTechStack({
        input: {
          proficiency: techStack.proficiency,
          technologyId: techStack.technologyId,
        },
      })
      if (error) setErrors((prev) => [...prev, error.message])
      count++
      setProgress((count / allCount) * 100)
    }
    console.log('blogs: ', blogs)
    for (const blog of blogs) {
      const { data, error: error1 } = await createBlog({
        input: {
          title: blog.title,
          kind: blog.kind,
          url: blog.url,
          publishedAt: blog.publishedAt,
        },
      })
      if (error1) setErrors((prev) => [...prev, error1.message])
      if (!data) continue

      const { error: error2 } = await updateBlogTags({
        id: data.createBlog.id,
        tags: blog.tags.map((t) => t.technology.id),
      })
      if (error2) setErrors((prev) => [...prev, error2.message])
      count++
      setProgress((count / allCount) * 100)
    }
    console.log('projects: ', projects)
    for (const project of projects) {
      const { data, error: error1 } = await createProject({
        input: {
          id: project.id,
          title: project.title,
          description: project.description,
          isFavorite: project.isFavorite,
          githubLink: project.githubLink,
          appLink: project.appLink,
          qiitaLink: project.qiitaLink,
          position: project.position,
        },
      })
      if (error1) setErrors((prev) => [...prev, error1.message])
      if (!data) continue
      const { error: error2 } = await updateProjectTags({
        id: data.createProject.id,
        tags: project.tags.map((t) => t.technology.id),
      })
      if (error2) setErrors((prev) => [...prev, error2.message])
      count++
      setProgress((count / allCount) * 100)
    }
  }

  return (
    <Box>
      <Typography variant="h4" component="h2">
        NewAll
      </Typography>
      {message && <Typography color="error">{message}</Typography>}
      <Box
        onSubmit={handleSubmit(submit)}
        component="form"
        sx={{ '> *': { margin: 2 } }}
      >
        <Box>
          <Controller
            name="json"
            control={control}
            rules={requiredRule}
            render={({ field, fieldState }) => (
              <TextField
                multiline
                fullWidth
                label="JSON"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                minRows={10}
                maxRows={20}
                {...field}
              />
            )}
          />
        </Box>
        <Box>
          <Button type="submit" fullWidth variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
      <ProcessingModal
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Sending..."
        errors={errors}
        progress={progress}
      />
    </Box>
  )
}
