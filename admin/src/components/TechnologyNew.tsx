'use client'
import { Box, Typography } from '@mui/material'
import { FilePreview, TechnologyForm } from './TechnologyForm'
import { TechnologyInput, useCreateTechnologyMutation } from '@/graphql/types'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const TechnologyNew = (): JSX.Element => {
  const { handleSubmit, getValues, control } = useForm<TechnologyInput>({
    defaultValues: { name: '', tagColor: '' },
  })
  const [, createTechnology] = useCreateTechnologyMutation()
  const router = useRouter()
  const [logo, setLogo] = useState<File | undefined>(undefined)
  const [logoPreview, setLogoPreview] = useState<FilePreview | undefined>(
    undefined
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
    console.log(logo)
    const { error } = await createTechnology({
      input: {
        ...getValues(),
        logo: logo,
      },
    })
    console.log(error)
    if (error != null) return
    void router.push('/technologies')
  }

  return (
    <Box>
      <Typography variant="h4" component="h1">
        NewTechnology
      </Typography>
      <TechnologyForm
        onLogoChange={onLogoChange}
        control={control}
        submit={handleSubmit(submit)}
        logoPreview={logoPreview}
      />
    </Box>
  )
}
