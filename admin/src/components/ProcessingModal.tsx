'use client'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import { LinearProgressWithLabel } from './LinearProgressWithLabel'
import { Box } from '@mui/system'

export type ProcessingModalProps = {
  progress: number
  errors: string[]
  title: string
  open: boolean
  onClose: () => void
}
export const ProcessingModal = ({
  progress,
  errors,
  title,
  open,
  onClose,
}: ProcessingModalProps): JSX.Element => {
  return (
    <Dialog onClose={onClose} maxWidth="xl" open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ width: '50vw' }}>
        <LinearProgressWithLabel value={progress} />
        <Box mt={3}>
          <Typography variant="h5" mb={2}>
            Errors
          </Typography>
          <TextField
            disabled
            fullWidth
            multiline
            minRows={10}
            value={errors.join('\n')}
          />
        </Box>
      </DialogContent>
    </Dialog>
  )
}
