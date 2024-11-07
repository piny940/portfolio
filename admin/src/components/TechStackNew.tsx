'use client'
import { Box, Typography } from '@mui/material'
import { TechStackForm } from './TechStackForm'
import {
  TechStackInput,
  useCreateTechStackMutation,
  useGetTechnologiesQuery,
} from '@/graphql/types'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Error from 'next/error'

export const TechStackNew = (): JSX.Element => {
  const [{ data: technologiesData, error }] = useGetTechnologiesQuery()
  const { watch, handleSubmit, getValues, control, setValue } =
    useForm<TechStackInput>({
      defaultValues: { proficiency: 0, technologyId: -1 },
    })
  const [, createTechStack] = useCreateTechStackMutation()
  const router = useRouter()

  const submit = async () => {
    const { data, error } = await createTechStack({ input: getValues() })
    if (data == null || error != null) return
    void router.push('/tech_stacks')
  }

  useEffect(() => {
    if (technologiesData == null) return
    if (technologiesData.technologies.length === 0) return
    setValue('technologyId', technologiesData.technologies[0].id)
  }, [technologiesData, setValue])

  if (error) return <Error statusCode={400} />
  if (!technologiesData || watch().technologyId < 0) return <>loading...</>
  if (technologiesData.technologies.length === 0) return <>no technologies</>
  return (
    <Box>
      <Typography variant="h4" component="h1">
        NewTechStack
      </Typography>
      <TechStackForm control={control} submit={handleSubmit(submit)} />
    </Box>
  )
}
