import { Box, Typography } from '@mui/material'
import { TechnologyForm } from './TechnologyForm'
import { useForm } from 'react-hook-form'
import {
  Technology,
  TechnologyInput,
  useUpdateTechnologyMutation,
} from '@/graphql/types'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
    },
  })
  const [, updateTechnology] = useUpdateTechnologyMutation()
  const router = useRouter()
  const [logo, setLogo] = useState<File | undefined>(undefined)
  const [logoPreview, setLogoPreview] = useState<string | undefined>(undefined)

  const onLogoChange = (file: File) => {
    setLogo(file)
    setLogoPreview(URL.createObjectURL(file))
  }

  const submit = async () => {
    const { error } = await updateTechnology({
      id: technology.id,
      input: {
        ...getValues(),
        logo: logo,
      },
    })
    if (error) return
    void router.push('/technologies')
  }

  return (
    <Box>
      <Typography variant="h4" component="h1">
        Edit Technology{technology.id}
      </Typography>
      <TechnologyForm
        onLogoChange={onLogoChange}
        logoPreview={logoPreview}
        control={control}
        submit={handleSubmit(submit)}
      />
    </Box>
  )
}
