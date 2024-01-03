import { ReactNode } from "react"

export type LayoutProps = {
  children: ReactNode
}
export const Layout = ({children}: LayoutProps) : JSX.Element => {
  return <div>
  {children}
  </div>
}