import Head from 'next/head'
import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { useTheme } from '@/context/ThemeProvider'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme()

  return (
    <div data-bs-theme={theme} className="bg-body text-body" id="root">
      <Head>
        <title>Piny940 ポートフォリオ</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="">{children}</main>
    </div>
  )
}
