import { Box, Typography } from '@mui/material'
import { BlogForm } from './BlogForm'
import { BlogInput, useCreateBlogMutation } from '@/graphql/types'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

export const NewBlog = (): JSX.Element => {
  const { register, watch, handleSubmit, getValues } = useForm<BlogInput>()
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
      <BlogForm submit={handleSubmit(submit)} register={register} />
    </Box>
  )
}
