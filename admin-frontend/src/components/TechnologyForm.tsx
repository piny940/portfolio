import { TechnologyInput } from '@/graphql/types'
import { Box, Button, TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

export type TechnologyFormProps = {
  submit: () => void
  control: Control<TechnologyInput, any>
}

export const TechnologyForm = ({
  control,
  submit,
}: TechnologyFormProps): JSX.Element => {
  const requiredRule = { required: 'このフィールドは必須です。' }
  return (
    <Box onSubmit={submit} component="form" sx={{ '> *': { margin: 2 } }}>
      <Box>
        <Controller
          control={control}
          name="name"
          rules={requiredRule}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              label="Name"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </Box>
      <Box>
        <Controller
          name="tagColor"
          control={control}
          rules={requiredRule}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              label="TagColor"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </Box>
      <Box>
        <Controller
          name="logoUrl"
          control={control}
          rules={requiredRule}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              label="LogoUrl"
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
