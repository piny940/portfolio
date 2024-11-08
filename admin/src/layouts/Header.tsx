'use client'
import { AppBar, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'

export const Header = (): JSX.Element => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link href="/" className="unstyled">
          <Typography variant="h6">PortfolioAdmin</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
