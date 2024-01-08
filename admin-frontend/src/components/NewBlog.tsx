import { Box } from '@mui/material'
import { BlogForm } from './BlogForm'
import { useState } from 'react'
import { BlogInput, BlogKind } from '@/graphql/types'

export const NewBlog = (): JSX.Element => {
  const [value, setValue] = useState<BlogInput>({
    title: '',
    kind: BlogKind.Qiita,
    url: '',
  })

  return (
    <Box>
      <BlogForm value={value} setInput={setValue} />
    </Box>
  )
}
