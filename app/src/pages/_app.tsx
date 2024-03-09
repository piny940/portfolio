import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Layout } from '../layouts/Layout'
import { useEffect } from 'react'
import { ThemeProvider } from '@/context/ThemeProvider'
import Head from 'next/head'
import { Theme } from '@/resources/types'

export interface PageProps {
  initialTheme: Theme
}

function MyApp({ Component, pageProps }: AppProps<PageProps>) {
  useEffect(() => {
    import('bootstrap')
  }, [])

  return (
    <ThemeProvider initialTheme={pageProps.initialTheme}>
      <Head>
        <meta content="width=device-width,initial-scale=1" name="viewport" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
