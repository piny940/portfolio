import { BlogInput } from '@/graphql/types'
import {
  Box,
  Button,
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
    <Box component="form" sx={{ '> *': { margin: 2 } }}>
      <Box>
        <TextField
          fullWidth
          label="Title"
          value={value.title}
          onChange={(e) => setInput({ ...value, title: e.target.value })}
        />
      </Box>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="blog-form-kind-select">Kind</InputLabel>
          <Select label="Kind" id="blog-form-kind-select" value={value.kind}>
            {allBlogKinds.map((blogKind) => (
              <MenuItem key={blogKind} value={blogKind}>
                {blogKindLabel[blogKind]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <TextField
          fullWidth
          label="URL"
          value={value.url}
          onChange={(e) => setInput({ ...value, url: e.target.value })}
        />
      </Box>
      <Box>
        <Button fullWidth variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  )
}
