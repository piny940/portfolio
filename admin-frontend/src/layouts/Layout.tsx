import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import { ReactNode } from 'react'

export type LayoutProps = {
  children: ReactNode
}
export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">PortfolioAdmin</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ pt: 4, pb: 6 }}>{children}</Container>
    </Box>
  )
}
