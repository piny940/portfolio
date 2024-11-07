'use client'
import client from '@/graphql/client'
import {
  AppBar,
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Provider } from 'urql'

export type LayoutProps = {
  children: ReactNode
}
export const Layout = ({ children }: LayoutProps): JSX.Element => {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#71f5aa',
        main: 'rgb(20, 214, 182)',
        dark: '#389200',
        contrastText: '#000000',
      },
      secondary: {
        light: '#5557ff',
        main: '#003eda',
        dark: '#062f98',
        contrastText: '#000',
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Provider value={client}>
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
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}
