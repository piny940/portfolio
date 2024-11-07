import { Layout } from '@/layouts/Layout'
import { ReactNode } from 'react'
import '../styles/globals.scss'

export default function Page({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
