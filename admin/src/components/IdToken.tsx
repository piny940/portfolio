'use client'
import { Typography } from '@mui/material'
import { toStorage } from '../../utils/storage'
import { BACKEND_JWT_TOKEN_KEY } from '../../utils/constants'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

type IDTokenProps = {
  idToken: string
}
export const IDToken = ({ idToken }: IDTokenProps): JSX.Element => {
  const router = useRouter()

  useEffect(() => {
    toStorage(BACKEND_JWT_TOKEN_KEY, idToken)
    router.push('/')
  }, [])

  return <Typography component="p">処理中。このままお待ちください</Typography>
}
