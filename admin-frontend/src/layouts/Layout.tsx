import { AppBar, Toolbar, Typography } from '@mui/material'
import { ReactNode } from 'react'

export type LayoutProps = {
  children: ReactNode
}
export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">PortfolioAdmin</Typography>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  )
}
