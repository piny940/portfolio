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
import { UseFormRegister } from 'react-hook-form'

export type BlogFormProps = {
  register: UseFormRegister<BlogInput>
  submit: () => void
}

export const BlogForm = ({ register, submit }: BlogFormProps): JSX.Element => {
  return (
    <Box onSubmit={submit} component="form" sx={{ '> *': { margin: 2 } }}>
      <Box>
        <TextField
          fullWidth
          label="Title"
          {...register('title', { required: true })}
        />
      </Box>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="blog-form-kind-select">Kind</InputLabel>
          <Select
            label="Kind"
            id="blog-form-kind-select"
            {...register('kind', { required: true })}
          >
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
          {...register('url', { required: true })}
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
