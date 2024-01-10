import { Box, Typography } from '@mui/material'
import { BlogForm, BlogFormFields } from './BlogForm'
import { useCreateBlogMutation } from '@/graphql/types'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

export const BlogNew = (): JSX.Element => {
  const { handleSubmit, getValues, control } = useForm<BlogFormFields>({
    defaultValues: { kind: 0, title: '', url: '' },
  })
  const [, createBlog] = useCreateBlogMutation()
  const router = useRouter()

  const submit = async () => {
    const { error } = await createBlog({ input: getValues() })
    if (error != null) return
    void router.push('/blogs')
  }

  return (
    <Box>
      <Typography variant="h4" component="h1">
        NewBlog
      </Typography>
      <BlogForm control={control} submit={handleSubmit(submit)} />
    </Box>
  )
}
