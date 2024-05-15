import { Box, Button, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { serialize } from 'object-to-formdata'
import { useRouter } from 'next/router'
import { toStorage } from '../../utils/storage'
import { BACKEND_JWT_TOKEN_KEY } from '../../utils/constants'

type LoginInput = {
  id: string
  password: string
}
export const Login = (): JSX.Element => {
  const { control, getValues, handleSubmit, setError } = useForm<LoginInput>({
    defaultValues: { id: '', password: '' },
  })
  const requiredRule = { required: 'このフィールドは必須です。' }
  const router = useRouter()
  const submit = async () => {
    const response = await fetch(`${process.env.BACKEND_HOST}/v1/login`, {
      method: 'POST',
      body: serialize(getValues()),
    })
    const data = await response.json()
    if (response.status === 400) {
      setError('id', { message: data.message })
      setError('password', { message: data.message })
      return
    }
    toStorage(BACKEND_JWT_TOKEN_KEY, data.token as string)
    void router.push('/')
  }
  return (
    <Box>
      <Typography variant="h4" component="h1">
        Login
      </Typography>
      <Box
        onSubmit={handleSubmit(submit)}
        component="form"
        sx={{ '> *': { margin: 2 } }}
      >
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
            name="password"
            control={control}
            rules={requiredRule}
            render={({ field, fieldState }) => (
              <TextField
                fullWidth
                type="password"
                label="Password"
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
    </Box>
  )
}
