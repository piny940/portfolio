'use client'
import { TechStackInput, useGetTechnologiesQuery } from '@/graphql/types'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import Error from 'next/error'
import { Control, Controller } from 'react-hook-form'
import { JSX } from 'react'

export type TechStackFormProps = {
  submit: () => void
  control: Control<TechStackInput, unknown>
}

export const TechStackForm = ({
  control,
  submit,
}: TechStackFormProps): JSX.Element => {
  const [{ data, error }] = useGetTechnologiesQuery()
  const requiredRule = { required: 'このフィールドは必須です。' }

  if (error) return <Error statusCode={404} />
  if (!data) return <>loading...</>
  return (
    <Box onSubmit={submit} component="form" sx={{ '> *': { margin: 2 } }}>
      <Box>
        <Controller
          control={control}
          name="technologyId"
          rules={requiredRule}
          render={({ field, fieldState }) => (
            <FormControl fullWidth>
              <InputLabel>Technology</InputLabel>
              <Select error={fieldState.invalid} label="Technology" {...field}>
                {data.technologies.map(tech => (
                  <MenuItem key={tech.id} value={tech.id}>
                    {tech.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
