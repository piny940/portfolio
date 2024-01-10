import { Box, Typography } from '@mui/material'
import { BlogForm } from './BlogForm'
import {
  BlogInput,
  useCreateBlogMutation,
  useUpdateBlogTagsMutation,
} from '@/graphql/types'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { TechnologyTagsFormFields } from './BlogTagsEdit'

export const BlogNew = (): JSX.Element => {
  const { handleSubmit, getValues, control } = useForm<BlogInput>({
    defaultValues: { kind: 0, title: '', url: '' },
  })
  const { getValues: getTagsValues, control: tagsControl } =
    useForm<TechnologyTagsFormFields>({
      defaultValues: { tags: [] },
    })
  const [, createBlog] = useCreateBlogMutation()
  const [, updateBlogTags] = useUpdateBlogTagsMutation()
  const router = useRouter()

  const submit = async () => {
    const { data, error } = await createBlog({ input: getValues() })
    if (data == null || error != null) return
    const { error: tagsError } = await updateBlogTags({
      id: data.createBlog.id,
      tags: getTagsValues().tags.map((tag) => tag.id),
    })
    if (tagsError != null) return
    void router.push('/blogs')
  }

  return (
    <Box>
      <Typography variant="h4" component="h1">
        NewBlog
      </Typography>
      <BlogForm
        tagsControl={tagsControl}
        control={control}
        submit={handleSubmit(submit)}
      />
    </Box>
  )
}
