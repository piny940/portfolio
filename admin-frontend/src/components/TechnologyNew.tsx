import { Box, Typography } from '@mui/material'
import { TechnologyForm } from './TechnologyForm'
import { TechnologyInput, useCreateTechnologyMutation } from '@/graphql/types'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

export const NewTechnology = (): JSX.Element => {
  const { handleSubmit, getValues, control } = useForm<TechnologyInput>({
    defaultValues: { name: '', tagColor: '', logoUrl: '' },
  })
  const [, createTechnology] = useCreateTechnologyMutation()
  const router = useRouter()

  const submit = async () => {
    const { error } = await createTechnology({ input: getValues() })
    if (error != null) return
    void router.push('/technologies')
  }

  return (
    <Box>
      <Typography variant="h4" component="h1">
        NewTechnology
      </Typography>
      <TechnologyForm control={control} submit={handleSubmit(submit)} />
    </Box>
  )
}
