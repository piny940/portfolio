import '@/styles/bootstrap.scss'
import '@/styles/globals.css'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import { ReactNode } from 'react'
import { ThemeProvider } from '@/context/ThemeProvider'
import { BootstrapClient } from '@/components/Common/BootstrapClient'
import { Navbar } from '@/components/Common/Navbar'

const applyInitialTheme = () => {
  try {
    const match = document.cookie.match(/(?:^|;\s*)theme=(dark|light)/)
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
    const theme = match ? match[1] : prefersDark ? 'dark' : 'light'
    document.documentElement.setAttribute('data-bs-theme', theme)
  }
  catch {
    document.documentElement.setAttribute('data-bs-theme', 'light')
  }
}

const notoSansJP = Noto_Sans_JP({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
})

const TITLE = 'mikan(@piny940) ポートフォリオ'
const DESCRIPTION = 'mikan(@piny940)のポートフォリオです。'
const ICON_URL = 'https://i.gyazo.com/445d44d3c0835cf7766527126daccc52.png'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.piny940.com'),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ' mikan piny940 ポートフォリオ',
  authors: [{ name: 'mikan' }],
  icons: {
    icon: '/favicon.ico',
    apple: ICON_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.piny940.com',
    siteName: TITLE,
    type: 'website',
    locale: 'ja_JP',
    images: [{ url: ICON_URL, width: 256, height: 256 }],
  },
  twitter: {
    card: 'summary',
    site: '@piny940',
  },
  alternates: {
    canonical: 'https://www.piny940.com',
  },
}

export const viewport: Viewport = {
  themeColor: '#f8f9fa',
}

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      className={'bg-body text-body ' + notoSansJP.variable}
      lang="ja"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: `(${applyInitialTheme.toString()})()` }}
        />
      </head>
      <body>
        <ThemeProvider>
          <BootstrapClient />
          <div id="root">
            <header>
              <Navbar />
            </header>
            <main className="pb-5">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
