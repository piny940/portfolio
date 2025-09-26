'use client'
import { Box, Typography } from '@mui/material'
import { FilePreview, TechnologyForm } from './TechnologyForm'
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
  const [logoPreview, setLogoPreview] = useState<FilePreview | undefined>(
    technology.logoUrl
      ? { filename: technology.logoUrl, src: technology.logoUrl, dirty: false }
      : undefined,
  )

  const onLogoChange = (file: File) => {
    setLogo(file)
    setLogoPreview({
      filename: file.name,
      src: URL.createObjectURL(file),
      dirty: true,
    })
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
        Edit Technology
        {technology.id}
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
