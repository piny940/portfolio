import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Layout } from '@/layouts/Layout'
import { Provider } from 'urql'
import client from '@/graphql/client'

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
      <Head>
        <meta content="width=device-width,initial-scale=1" name="viewport" />
      </Head>
      <CssBaseline />
      <Provider value={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  )
}

export default MyApp
