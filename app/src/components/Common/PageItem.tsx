import { MouseEventHandler, ReactNode } from 'react'

export type PageItemProps = {
  children: ReactNode
  onClick: MouseEventHandler
  pageLinkClassName?: string
  pageClassName?: string
}

export const PageItem = ({
  children,
  onClick,
  pageLinkClassName = '',
  pageClassName = '',
}: PageItemProps): JSX.Element => {
  return (
    <li className={'page-item ' + pageClassName}>
      <button className={'page-link ' + pageLinkClassName} onClick={onClick}>
        {children}
      </button>
    </li>
  )
}
