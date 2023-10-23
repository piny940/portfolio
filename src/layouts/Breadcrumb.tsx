import { memo } from 'react'

const Breadcrumb = (): JSX.Element => {
  return (
    <nav aria-label="breadcrumb" className="mt-3 ms-5">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">Home</a>
        </li>
        <li className="breadcrumb-item">
          <a href="#">Library</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Data
        </li>
      </ol>
    </nav>
  )
}

export default memo(Breadcrumb)
