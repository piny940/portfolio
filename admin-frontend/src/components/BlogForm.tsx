import { BlogInput } from '@/graphql/types'
import { Box, Select, TextField } from '@mui/material'

export type BlogFormProps = {
  value: BlogInput
  setInput: (input: BlogInput) => void
}

export const BlogForm = ({ value, setInput }: BlogFormProps): JSX.Element => {
  return (
    <Box component="form" sx={{ '> *': { margin: 1 } }}>
      <TextField
        label="Title"
        value={value.title}
        onChange={(e) => setInput({ ...value, title: e.target.value })}
      />
      <Select label="Kind"></Select>
      <TextField
        label="URL"
        value={value.url}
        onChange={(e) => setInput({ ...value, url: e.target.value })}
      />
    </Box>
  )
}
