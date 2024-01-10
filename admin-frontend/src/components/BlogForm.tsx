import { BlogInput } from '@/graphql/types'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { allBlogKinds, blogKindLabel } from '../../utils/types'
import { Control, Controller } from 'react-hook-form'
import { EditBlogTags, TechnologyTagsFormFields } from './EditBlogTags'

export interface BlogFormFields extends BlogInput {
  tags: Array<{ id: number }>
}
export type BlogFormProps = {
  submit: () => void
  control: Control<BlogFormFields, any>
  tagsControl: Control<TechnologyTagsFormFields, any>
}

export const BlogForm = ({
  control,
  submit,
  tagsControl,
}: BlogFormProps): JSX.Element => {
  const requiredRule = { required: 'このフィールドは必須です。' }
  return (
    <Box onSubmit={submit} component="form" sx={{ '> *': { margin: 2 } }}>
      <Box>
        <Controller
          control={control}
          name="title"
          rules={requiredRule}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              label="Title"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </Box>
      <Box>
        <Controller
          name="kind"
          control={control}
          rules={requiredRule}
          render={({ field, fieldState }) => (
            <FormControl fullWidth>
              <InputLabel id="blog-form-kind-select">Kind</InputLabel>
              <Select
                label="Kind"
                id="blog-form-kind-select"
                error={fieldState.invalid}
                {...field}
              >
                {allBlogKinds.map((blogKind) => (
                  <MenuItem key={blogKind} value={blogKind}>
                    {blogKindLabel[blogKind]}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Box>
      <Box>
        <Controller
          name="url"
          control={control}
          rules={requiredRule}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              label="URL"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </Box>
      <EditBlogTags control={tagsControl} />
      <Box>
        <Button type="submit" fullWidth variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  )
}
