import { memo } from 'react'
import styled from 'styled-components'

const BlogItemDiv = styled.div`
  min-width: 350px;
  max-width: 100%;
`

const BlogItem = (): JSX.Element => {
  return (
    <BlogItemDiv className="bg-body p-3 rounded border d-flex flex-column align-items-center position-relative w-100 h-100 ">
      ほげ！
    </BlogItemDiv>
  )
}

export default memo(BlogItem)
