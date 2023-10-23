import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { useTheme } from '@/context/ThemeProvider'
import Head from './Head'
import Breadcrumb from './Breadcrumb'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme()

  return (
    <div data-bs-theme={theme} className="bg-body text-body" id="root">
      <Head />
      <header>
        <Navbar />
      </header>
      <main className="">
        <Breadcrumb />
        {children}
      </main>
    </div>
  )
}
