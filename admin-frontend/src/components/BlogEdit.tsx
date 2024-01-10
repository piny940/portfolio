import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import {
  Blog,
  BlogInput,
  useUpdateBlogMutation,
  useUpdateBlogTagsMutation,
} from '@/graphql/types'
import { useRouter } from 'next/router'
import { BlogForm } from './BlogForm'
import { TechnologyTagsFormFields } from './BlogTagsEdit'

export type BlogEditProps = {
  blog: Pick<Blog, 'id' | 'title' | 'kind' | 'url' | 'tags'>
}

export const BlogEdit = ({ blog }: BlogEditProps): JSX.Element => {
  const { getValues, control, handleSubmit } = useForm<BlogInput>({
    defaultValues: {
      title: blog.title,
      kind: blog.kind,
      url: blog.url,
    },
  })
  const { getValues: getTagsValues, control: tagsControl } =
    useForm<TechnologyTagsFormFields>({
      defaultValues: { tags: blog.tags },
    })
  const [, updateBlog] = useUpdateBlogMutation()
  const [, updateBlogTags] = useUpdateBlogTagsMutation()
  const router = useRouter()

  const submit = async () => {
    const { data, error } = await updateBlog({
      id: blog.id,
      input: getValues(),
    })
    if (!data || error) return
    const { error: tagsError } = await updateBlogTags({
      id: data.updateBlog.id,
      tags: getTagsValues().tags.map((tag) => tag.id),
    })
    if (tagsError) return
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
