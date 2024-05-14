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
import { useCallback, useState } from 'react'
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

  const fromJson = useCallback((json: string) => {
    let data
    try {
      data = JSON.parse(json)
      const blogs = (data.blogs.items || []) as Blog[]
      const projects = (data.projects || []) as Project[]
      const techStacks = (data.techStacks || []) as TechStack[]
      const technologies = (data.technologies || []) as Technology[]
      return { blogs, projects, techStacks, technologies }
    } catch (e) {
      if (e instanceof Error) {
        setMessage(e.message)
      }
      console.error(e)
    }
  }, [])

  const createTechnologies = useCallback(
    async (technologies: Technology[], onStep: () => void) => {
      const newTechs = []
      for (const technology of technologies) {
        try {
          const { data } = await createTechnology({
            input: {
              name: technology.name,
              logoUrl: technology.logoUrl,
              tagColor: technology.tagColor,
            },
          })
          if (!data) {
            console.error('Failed to create technology')
            setErrors((prev) => [...prev, 'Failed to create technology'])
            break
          }
          newTechs.push(data.createTechnology)
        } catch (e) {
          console.error(e)
          if (e instanceof Error) {
            setErrors((prev) => [...prev, e.message])
          }
        }
        onStep()
      }
      return newTechs
    },
    [createTechnology, setErrors]
  )
  const createTechStacks = useCallback(
    async (
      techStacks: TechStack[],
      techNameIdMap: { [key in string]: number },
      onStep: () => void
    ) => {
      for (const techStack of techStacks) {
        const { error } = await createTechStack({
          input: {
            proficiency: techStack.proficiency,
            technologyId: techNameIdMap[techStack.technology.name],
          },
        })
        if (error) setErrors((prev) => [...prev, error.message])
        onStep()
      }
    },
    [createTechStack, setErrors]
  )
  const createBlogs = useCallback(
    async (
      blogs: Blog[],
      techNameIdMap: { [key in string]: number },
      onStep: () => void
    ) => {
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
          tags: blog.tags.map((t) => techNameIdMap[t.technology.name]),
        })
        if (error2) setErrors((prev) => [...prev, error2.message])
        onStep()
      }
    },
    [createBlog, updateBlogTags, setErrors]
  )
  const createProjects = useCallback(
    async (
      projects: Project[],
      techNameIdMap: { [key in string]: number },
      onStep: () => void
    ) => {
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
          tags: project.tags.map((t) => techNameIdMap[t.technology.name]),
        })
        if (error2) setErrors((prev) => [...prev, error2.message])
        onStep()
      }
    },
    [createProject, updateProjectTags, setErrors]
  )

  const submit = async () => {
    const data = fromJson(getValues().json)
    if (!data) return
    const { blogs, projects, techStacks, technologies } = data
    const allCount =
      blogs.length + projects.length + techStacks.length + technologies.length
    let count = 0
    setDialogOpen(true)
    setProgress(0)
    setErrors([])

    console.log('technologies: ', technologies)
    const newTechs = await createTechnologies(technologies, () => {
      count++
      setProgress((count / allCount) * 100)
    })
    const techNameIdMap: { [key in string]: number } = {}
    newTechs.forEach((t) => {
      techNameIdMap[t.name] = t.id
    })

    console.log('techStacks: ', techStacks)
    void createTechStacks(techStacks, techNameIdMap, () => {
      count++
      setProgress((count / allCount) * 100)
    })

    console.log('blogs: ', blogs)
    void createBlogs(blogs, techNameIdMap, () => {
      count++
      setProgress((count / allCount) * 100)
    })

    console.log('projects: ', projects)
    void createProjects(projects, techNameIdMap, () => {
      count++
      setProgress((count / allCount) * 100)
    })
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
