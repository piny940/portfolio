import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { BlogFormFields } from './BlogForm'
import { Control, Controller, useFieldArray } from 'react-hook-form'
import { useGetTechnologiesQuery } from '@/graphql/types'
import Error from 'next/error'

export type EditBlogTagProps = {
  control: Control<BlogFormFields, any>
}
export const EditBlogTag = ({ control }: EditBlogTagProps): JSX.Element => {
  const { fields, append } = useFieldArray({ control, name: 'tags' })
  const [{ data, error }] = useGetTechnologiesQuery()

  if (!data) return <>loading...</>
  if (error) return <Error statusCode={400} />
  if (data.technologies.length === 0) return <>No technologies</>
  return (
    <Box>
      {fields.map((item, index) => (
        <Box key={item.id}>
          <Controller
            control={control}
            name={`tags.${index}.id`}
            render={({ field, fieldState }) => (
              <FormControl fullWidth>
                <InputLabel id={`blog-form-tags-select-${index}`}>
                  タグ
                </InputLabel>
                <Select
                  label="Kind"
                  id={`blog-form-tags-select-${index}`}
                  error={fieldState.invalid}
                  {...field}
                >
                  {data.technologies.map((technology) => (
                    <MenuItem key={technology.id} value={technology.id}>
                      {technology.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>
      ))}
      <Button onClick={() => append({ id: data.technologies[0].id })}>
        追加
      </Button>
    </Box>
  )
}
