'use client'
import { useGetMeQuery } from '@/graphql/types'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { toStorage } from '../../utils/storage'
import { BACKEND_JWT_TOKEN_KEY } from '../../utils/constants'

export const Header = (): JSX.Element => {
  const [{ data }] = useGetMeQuery()
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/" className="unstyled">
          <Typography variant="h6">PortfolioAdmin</Typography>
        </Link>
        {data?.me && (
          <Button
            onClick={() => toStorage(BACKEND_JWT_TOKEN_KEY, '')}
            color="inherit"
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
