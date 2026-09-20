import Link from 'next/link'
import { JSX, memo } from 'react'

export type BreadcrumbProps = {
  paths: Array<{
    name: string
    path: string
  }>
}

const Breadcrumb = ({ paths }: BreadcrumbProps): JSX.Element => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {paths.slice(0, paths.length - 1).map(path => (
          <li className="breadcrumb-item" key={path.path}>
            <Link href={path.path}>{path.name}</Link>
          </li>
        ))}
        <li
          className="breadcrumb-item active"
          key={paths[paths.length - 1].path}
          aria-current="page"
        >
          {paths[paths.length - 1].name}
        </li>
      </ol>
    </nav>
  )
}

export default memo(Breadcrumb)
