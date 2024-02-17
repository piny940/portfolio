import { ReactNode } from 'react'
import { Navbar } from './Navbar'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div id="root">
      <header>
        <Navbar />
      </header>
      <main className="pb-5">{children}</main>
    </div>
  )
}
