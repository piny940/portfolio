import { CssBaseline, ThemeProvider } from '@mui/material'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Layout } from '@/layouts/Layout'

const theme = {}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta content="width=device-width,initial-scale=1" name="viewport" />
      </Head>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
