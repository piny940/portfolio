import { Box, Typography } from '@mui/material'
import { BlogForm } from './BlogForm'
import { useForm } from 'react-hook-form'
import { Blog, BlogInput, useUpdateBlogMutation } from '@/graphql/types'
import { useRouter } from 'next/router'

export type EditBlogProps = {
  blog: Blog
}

export const EditBlog = ({ blog }: EditBlogProps): JSX.Element => {
  const { getValues, control, handleSubmit } = useForm<BlogInput>({
    defaultValues: { title: blog.title, kind: blog.kind, url: blog.url },
  })
  const [, updateBlog] = useUpdateBlogMutation()
  const router = useRouter()

  const submit = async () => {
    const { error } = await updateBlog({ id: blog.id, input: getValues() })
    if (error) return
    void router.push('/blogs')
  }

  return (
    <Box>
      <Typography variant="h4" component="h1">
        Edit Blog{blog.id}
      </Typography>
      <BlogForm control={control} submit={handleSubmit(submit)} />
    </Box>
  )
}
