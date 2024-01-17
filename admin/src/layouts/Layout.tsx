import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'

export type LayoutProps = {
  children: ReactNode
}
export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Link href="/" className="unstyled">
            <Typography variant="h6">PortfolioAdmin</Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ pt: 4, pb: 6 }}>
        {children}
      </Container>
    </Box>
  )
}
