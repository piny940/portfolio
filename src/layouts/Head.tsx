import { useTheme } from '@/context/ThemeProvider'
import HeadBase from 'next/head'
import { memo } from 'react'

const Head = (): JSX.Element => {
  const { theme } = useTheme()

  return (
    <HeadBase>
      <title>Piny940 ポートフォリオ</title>
      <meta content="text/html; charset=UTF-8" httpEquiv="Content-Type" />
      <meta content="Piny940 ポートフォリオ" name="keywords" />
      <meta
        name="theme-color"
        content={theme === 'dark' ? '#212529' : '#f8f9fa'}
      />
      <link rel="icon" href="/favicon.ico" />
    </HeadBase>
  )
}

export default memo(Head)
