import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Layout } from '@/layouts/Layout'
import { Provider } from 'urql'
import getClient from '@/graphql/client'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Head>
          <meta content="width=device-width,initial-scale=1" name="viewport" />
        </Head>
        <Provider value={getClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default MyApp
