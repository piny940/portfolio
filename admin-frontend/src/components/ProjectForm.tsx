import { ProjectInput } from '@/graphql/types'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
} from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import { TechTagsEdit, TechTagsFormFields } from './TechTagsEdit'

export type ProjectFormProps = {
  submit: () => void
  control: Control<ProjectInput, any>
  tagsControl: Control<TechTagsFormFields, any>
}

export const ProjectForm = ({
  control,
  submit,
  tagsControl,
}: ProjectFormProps): JSX.Element => {
  const requiredRule = { required: 'このフィールドは必須です。' }
  return (
    <Box onSubmit={submit} component="form" sx={{ '> *': { margin: 2 } }}>
      <Box>
        <Controller
          control={control}
          name="id"
          rules={requiredRule}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              label="ID"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </Box>
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
          name="description"
          control={control}
          rules={requiredRule}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              label="Description"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </Box>
      <Box>
        <Controller
          name="isFavorite"
          control={control}
          render={({ field, fieldState }) => (
            <FormControl fullWidth error={fieldState.invalid}>
              <FormControlLabel
                label="isFavorite"
                control={<Checkbox checked={field.value} {...field} />}
              />
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Box>
      <TechTagsEdit control={tagsControl} />
      <Box>
        <Button type="submit" fullWidth variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  )
}
