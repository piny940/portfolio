import { TestID } from '@/resources/TestID'
import { JSX, MouseEventHandler, ReactNode } from 'react'

export type PageItemProps = {
  children: ReactNode
  onClick: MouseEventHandler
  pageLinkClassName?: string
  pageClassName?: string
  testID?: TestID
}

export const PageItem = ({
  children,
  onClick,
  pageLinkClassName = '',
  pageClassName = '',
  testID,
}: PageItemProps): JSX.Element => {
  return (
    <li data-testid={testID} className={'page-item ' + pageClassName}>
      <button className={'page-link ' + pageLinkClassName} onClick={onClick}>
        {children}
      </button>
    </li>
  )
}
