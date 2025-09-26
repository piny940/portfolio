'use client'
import client from '@/graphql/client'
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ReactNode } from 'react'
import { Provider } from 'urql'
import { Header } from './Header'
import { JSX } from 'react'

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
            <Header />
            <Container component="main" sx={{ pt: 4, pb: 6 }}>
              {children}
            </Container>
          </Box>
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}
