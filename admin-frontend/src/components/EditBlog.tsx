import { Box, Typography } from '@mui/material'
import { BlogForm } from './BlogForm'
import { useForm } from 'react-hook-form'
import { BlogInput, useGetBlogQuery } from '@/graphql/types'
import Error from 'next/error'
import { useEffect } from 'react'

export type EditBlogProps = {
  id: number
}

export const EditBlog = ({ id }: EditBlogProps): JSX.Element => {
  const [{ data, fetching, error }] = useGetBlogQuery({ variables: { id } })
  const { control, handleSubmit, reset } = useForm<BlogInput>({
    defaultValues: data?.blog || { title: '', kind: 0, url: '' },
  })
  const submit = async () => {
    console.log('submit')
  }

  useEffect(() => {
    console.log(fetching)
    reset()
  }, [fetching, reset])
  if (error != null) return <Error statusCode={404} />
  return (
    <Box>
      <Typography variant="h4" component="h1">
        Edit Blog{id}
      </Typography>
      <BlogForm control={control} submit={handleSubmit(submit)} />
    </Box>
  )
}
