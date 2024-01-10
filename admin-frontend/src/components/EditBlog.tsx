import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Blog, useUpdateBlogMutation } from '@/graphql/types'
import { useRouter } from 'next/router'
import { BlogForm, BlogFormFields } from './BlogForm'
import { TechnologyTagsFormFields } from './EditBlogTags'

export type EditBlogProps = {
  blog: Blog
}

export const EditBlog = ({ blog }: EditBlogProps): JSX.Element => {
  const { getValues, control, handleSubmit } = useForm<BlogFormFields>({
    defaultValues: {
      title: blog.title,
      kind: blog.kind,
      url: blog.url,
      tags: blog.tags,
    },
  })
  const { control: tagsControl } = useForm<TechnologyTagsFormFields>({
    defaultValues: { tags: blog.tags },
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
      <BlogForm
        tagsControl={tagsControl}
        control={control}
        submit={handleSubmit(submit)}
      />
    </Box>
  )
}
