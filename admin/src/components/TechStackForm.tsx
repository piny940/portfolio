import { TechStackInput } from '@/graphql/types'
import { Box, Button, TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

export type TechStackFormProps = {
  submit: () => void
  control: Control<TechStackInput, any>
}

export const TechStackForm = ({
  control,
  submit,
}: TechStackFormProps): JSX.Element => {
  const requiredRule = { required: 'このフィールドは必須です。' }
  return (
    <Box onSubmit={submit} component="form" sx={{ '> *': { margin: 2 } }}>
      <Box>
        <Controller
          control={control}
          name="technologyId"
          rules={requiredRule}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              label="Technology"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </Box>
      <Box>
        <Controller
          name="proficiency"
          control={control}
          rules={requiredRule}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              label="Proficiency"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </Box>
      <Box>
        <Button type="submit" fullWidth variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  )
}
