import { Box, Typography } from '@mui/material'
import { TechStackForm } from './TechStackForm'
import { TechStackInput, useCreateTechStackMutation } from '@/graphql/types'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

export const TechStackNew = (): JSX.Element => {
  const { handleSubmit, getValues, control } = useForm<TechStackInput>({
    defaultValues: { proficiency: 0 },
  })
  const [, createTechStack] = useCreateTechStackMutation()
  const router = useRouter()

  const submit = async () => {
    const { data, error } = await createTechStack({ input: getValues() })
    if (data == null || error != null) return
    void router.push('/tech_stacks')
  }

  return (
    <Box>
      <Typography variant="h4" component="h1">
        NewTechStack
      </Typography>
      <TechStackForm control={control} submit={handleSubmit(submit)} />
    </Box>
  )
}
