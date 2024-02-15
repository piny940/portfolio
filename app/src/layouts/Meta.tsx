import { useTheme } from '@/context/ThemeProvider'
import Head from 'next/head'
import { memo, useMemo } from 'react'

export type MetaProps = {
  keyword?: string
  noIndex?: boolean
}

const Meta = ({ keyword, noIndex = false }: MetaProps): JSX.Element => {
  const { theme } = useTheme()
  const prefix = useMemo(() => (keyword ? `${keyword} | ` : ''), [keyword])

  return (
    <Head>
      <title>{prefix + 'piny940 ポートフォリオ'}</title>
      <meta content="text/html; charset=UTF-8" httpEquiv="Content-Type" />
      <meta
        content={(keyword || '') + ' piny940 ポートフォリオ'}
        name="keywords"
      />
      <meta
        name="theme-color"
        content={theme === 'dark' ? '#212529' : '#f8f9fa'}
      />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content={prefix + 'piny940 ポートフォリオ'} />
      <meta name="author" content="mikan" />
      <meta name="description" content="piny940のポートフォリオです。" />
      <meta property="og:description" content="piny940のポートフォリオです。" />
      <meta property="og:url" content="https://www.piny940.com" />
      <meta
        property="og:site_name"
        content={prefix + 'piny940 ポートフォリオ'}
      />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ja_JP" />
      <meta
        property="og:image"
        content="https://i.gyazo.com/445d44d3c0835cf7766527126daccc52.png"
      />
      <meta property="og:image:width" content="256" />
      <meta property="og:image:height" content="256" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@piny940" />
      <link
        rel="apple-touch-icon"
        href="https://i.gyazo.com/445d44d3c0835cf7766527126daccc52.png"
      />
      <link rel="canonical" href="https://www.piny940.com" />
      {noIndex && <meta name="robots" content="noindex" />}
    </Head>
  )
}

export default memo(Meta)
