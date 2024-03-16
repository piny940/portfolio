import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Blog, BlogInput, useUpdateBlogWithTagsMutation } from '@/graphql/types'
import { useRouter } from 'next/router'
import { BlogForm } from './BlogForm'
import { TechTagsFormFields } from './TechTagsEdit'

export type BlogEditProps = {
  blog: Pick<Blog, 'id' | 'title' | 'kind' | 'url' | 'tags' | 'publishedAt'>
}

export const BlogEdit = ({ blog }: BlogEditProps): JSX.Element => {
  const { getValues, control, handleSubmit } = useForm<BlogInput>({
    defaultValues: {
      title: blog.title,
      kind: blog.kind,
      url: blog.url,
      publishedAt: blog.publishedAt,
    },
  })
  const { getValues: getTagsValues, control: tagsControl } =
    useForm<TechTagsFormFields>({
      defaultValues: { tags: blog.tags.map((t) => t.technology) },
    })
  const [, updateBlog] = useUpdateBlogWithTagsMutation()
  const router = useRouter()

  const submit = async () => {
    const { data, error } = await updateBlog({
      id: blog.id,
      input: getValues(),
      tags: getTagsValues().tags.map((tag) => tag.id),
    })
    if (!data || error) return
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
