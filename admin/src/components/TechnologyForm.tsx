'use client'
import { TechnologyInput } from '@/graphql/types'
import { Box, Button, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { Control, Controller } from 'react-hook-form'
import { JSX } from 'react'

export type TechnologyFormProps = {
  submit: () => void
  control: Control<TechnologyInput, unknown>
  onLogoChange: (file: File) => void
  logoPreview: FilePreview | undefined
}
export type FilePreview = {
  filename: string
  src: string
  dirty: boolean
}

export const TechnologyForm = ({
  control,
  submit,
  onLogoChange,
  logoPreview,
}: TechnologyFormProps): JSX.Element => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        onLogoChange(file)
      }
    },
  })
  const requiredRule = { required: 'このフィールドは必須です。' }
  return (
    <Box onSubmit={submit} component="form" sx={{ '> *': { margin: 2 } }}>
      <Box>
        <Controller
          control={control}
          name="name"
          rules={requiredRule}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              label="Name"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </Box>
      <Box>
        <Controller
          name="tagColor"
          control={control}
          rules={requiredRule}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              label="TagColor"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </Box>
      <Box pl={3} sx={{ '> *': { margin: 2 } }}>
        <Typography variant="h5" component="p">
          Logo
        </Typography>
        <Box
          {...getRootProps()}
          sx={{
            background: '#fafafa',
            borderRadius: '4px',
            borderStyle: 'solid',
            borderColor: '#bbb',
            color: '#777',
            px: '20px',
            py: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <input {...getInputProps()} />
          <Typography component="p">
            Drag &apos;n&apos; drop some files here, or click to select files
          </Typography>
        </Box>
        {logoPreview && (
          <>
            <Image
              style={{ objectFit: 'contain' }}
              width={100}
              height={100}
              src={logoPreview.src}
              alt="logo"
            />
            {logoPreview.dirty && (
              <Typography component="p">{logoPreview.filename}</Typography>
            )}
          </>
        )}
      </Box>
      <Box>
        <Button type="submit" fullWidth variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  )
}
