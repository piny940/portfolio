import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import {
  TechStack,
  TechStackInput,
  useUpdateTechStackMutation,
} from '@/graphql/types'
import { useRouter } from 'next/router'
import { TechStackForm } from './TechStackForm'

export type TechStackEditProps = {
  techStack: Pick<TechStack, 'id' | 'technologyId' | 'proficiency'>
}

export const TechStackEdit = ({
  techStack,
}: TechStackEditProps): JSX.Element => {
  const { getValues, control, handleSubmit } = useForm<TechStackInput>({
    defaultValues: {
      technologyId: techStack.technologyId,
      proficiency: techStack.proficiency,
    },
  })
  const [, updateTechStack] = useUpdateTechStackMutation()
  const router = useRouter()

  const submit = async () => {
    const { data, error } = await updateTechStack({
      id: techStack.id,
      input: getValues(),
    })
    if (!data || error) return
    void router.push('/tech_stacks')
  }

  return (
    <Box>
      <Typography variant="h4" component="h1">
        Edit TechStack{techStack.id}
      </Typography>
      <TechStackForm control={control} submit={handleSubmit(submit)} />
    </Box>
  )
}
