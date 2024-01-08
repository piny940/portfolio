import { Box, Typography } from '@mui/material'
import { BlogForm } from './BlogForm'
import { useState } from 'react'
import { BlogInput } from '@/graphql/types'

export const NewBlog = (): JSX.Element => {
  const [value, setValue] = useState<BlogInput>({ title: '', kind: 0, url: '' })

  return (
    <Box>
      <Typography variant="h4" component="h1">
        NewBlog
      </Typography>
      <BlogForm value={value} setInput={setValue} />
    </Box>
  )
}
