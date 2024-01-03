import { CssBaseline, ThemeProvider } from '@mui/material'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'

const theme = {}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta content="width=device-width,initial-scale=1" name="viewport" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
