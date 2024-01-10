import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import {
  Control,
  Controller,
  FieldValues,
  useFieldArray,
} from 'react-hook-form'
import { useGetTechnologiesQuery } from '@/graphql/types'
import Error from 'next/error'

export interface TechnologyTagsFormFields extends FieldValues {
  tags: Array<{ id: number }>
}
export type BlogTagsEditProps = {
  control: Control<TechnologyTagsFormFields, any>
}
export const BlogTagsEdit = ({ control }: BlogTagsEditProps): JSX.Element => {
  const { fields, append } = useFieldArray({ control, name: 'tags' })
  const [{ data, error }] = useGetTechnologiesQuery()

  if (!data) return <>loading...</>
  if (error) return <Error statusCode={400} />
  if (data.technologies.length === 0) return <>No technologies</>
  return (
    <Box>
      <Typography variant="h5" component="h3">
        タグ
      </Typography>
      <List>
        {fields.map((item, index) => (
          <ListItem key={item.id}>
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
          </ListItem>
        ))}
      </List>
      <Button onClick={() => append({ id: data.technologies[0].id })}>
        タグ追加
      </Button>
    </Box>
  )
}
