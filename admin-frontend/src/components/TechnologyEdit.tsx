import { Box, Typography } from '@mui/material'
import { TechnologyForm } from './TechnologyForm'
import { useForm } from 'react-hook-form'
import {
  Technology,
  TechnologyInput,
  useUpdateTechnologyMutation,
} from '@/graphql/types'
import { useRouter } from 'next/router'

export type TechnologyEditProps = {
  technology: Technology
}

export const TechnologyEdit = ({
  technology,
}: TechnologyEditProps): JSX.Element => {
  const { getValues, control, handleSubmit } = useForm<TechnologyInput>({
    defaultValues: {
      name: technology.name,
      tagColor: technology.tagColor,
      logoUrl: technology.logoUrl,
    },
  })
  const [, updateTechnology] = useUpdateTechnologyMutation()
  const router = useRouter()

  const submit = async () => {
    const { error } = await updateTechnology({
      id: technology.id,
      input: getValues(),
    })
    if (error) return
    void router.push('/technologies')
  }

  return (
    <Box>
      <Typography variant="h4" component="h1">
        Edit Technology{technology.id}
      </Typography>
      <TechnologyForm control={control} submit={handleSubmit(submit)} />
    </Box>
  )
}
