import { ReactNode } from 'react'
import '../styles/globals.scss'
import { Layout } from '@/layouts/AppLayout'

export default function Page({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
