import { BlogInput } from '@/graphql/types'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { allBlogKinds, blogKindLabel } from '../../utils/types'

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
      <FormControl>
        <InputLabel id="blog-form-kind-select">Kind</InputLabel>
        <Select label="Kind" id="blog-form-kind-select" value={value.kind}>
          {allBlogKinds.map((blogKind) => (
            <MenuItem key={blogKind} value={blogKind}>
              {blogKindLabel[blogKind]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="URL"
        value={value.url}
        onChange={(e) => setInput({ ...value, url: e.target.value })}
      />
    </Box>
  )
}
