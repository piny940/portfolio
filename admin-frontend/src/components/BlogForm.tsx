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
import { Control, Controller, UseFormRegister } from 'react-hook-form'

export type BlogFormProps = {
  register: UseFormRegister<BlogInput>
  submit: () => void
  control: Control<BlogInput, any>
}

export const BlogForm = ({
  control,
  register,
  submit,
}: BlogFormProps): JSX.Element => {
  return (
    <Box onSubmit={submit} component="form" sx={{ '> *': { margin: 2 } }}>
      <Box>
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState }) => (
            <TextField fullWidth label="Title" {...field} />
          )}
        />
      </Box>
      <Box>
        <Controller
          name="kind"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="blog-form-kind-select">Kind</InputLabel>
              <Select label="Kind" id="blog-form-kind-select" {...field}>
                {allBlogKinds.map((blogKind) => (
                  <MenuItem key={blogKind} value={blogKind}>
                    {blogKindLabel[blogKind]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </Box>
      <Box>
        <Controller
          name="url"
          control={control}
          render={({ field }) => <TextField fullWidth label="URL" {...field} />}
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
