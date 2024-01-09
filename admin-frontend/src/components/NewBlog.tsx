import { Box, Typography } from '@mui/material'
import { BlogForm } from './BlogForm'
import { BlogInput, useCreateBlogMutation } from '@/graphql/types'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

export const NewBlog = (): JSX.Element => {
  const { register, watch, handleSubmit, getValues, control } =
    useForm<BlogInput>({ defaultValues: { kind: 0, title: '', url: '' } })
  const [, createBlog] = useCreateBlogMutation()

  const submit = async () => {
    console.log(getValues())
    await createBlog({ input: getValues() })
    return {}
  }
  useEffect(() => {
    console.log(watch().kind, 'hoge')
  }, [watch])

  return (
    <Box>
      <Typography variant="h4" component="h1">
        NewBlog
      </Typography>
      <BlogForm
        control={control}
        submit={handleSubmit(submit)}
        register={register}
      />
    </Box>
  )
}
