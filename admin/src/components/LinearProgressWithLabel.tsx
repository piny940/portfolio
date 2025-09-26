'use client'
import { LinearProgress, LinearProgressProps, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { JSX } from 'react'

export type LinearProgressWithLabelProps = LinearProgressProps & {
  value: number
}
export const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number },
): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {`${Math.round(
            props.value,
          )}%`}
        </Typography>
      </Box>
    </Box>
  )
}
