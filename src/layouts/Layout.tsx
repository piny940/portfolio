import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import Head from './Head'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div id="root">
      <Head />
      <header>
        <Navbar />
      </header>
      <main className="">{children}</main>
    </div>
  )
}
