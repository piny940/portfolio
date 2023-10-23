import Link from 'next/link'
import { memo } from 'react'

export type BreadcrumbProps = {
  paths: [
    {
      name: string
      path: string
    }
  ]
}

const Breadcrumb = ({ paths }: BreadcrumbProps): JSX.Element => {
  return (
    <nav aria-label="breadcrumb" className="mt-3 ms-5">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/">トップページ</Link>
        </li>
        {paths.map((path, i) => (
          <li className="breadcrumb-item" key={path.path}>
            <Link
              href={
                '/' +
                paths
                  .slice(0, i + 1)
                  .map((p) => p.path)
                  .join('/')
              }
            >
              {path.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default memo(Breadcrumb)
