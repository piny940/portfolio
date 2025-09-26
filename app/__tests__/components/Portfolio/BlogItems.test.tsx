import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import BlogItems, { BlogItemsProps } from '@/components/Portfolio/BlogItems'
import { TestID } from '@/resources/TestID'
import { blogs } from '../../testHelpers/mock'

describe('<BlogItems />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<BlogItemsProps>({ blogs })
    const component = render(<BlogItems {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
      expect(component.getAllByTestId(TestID.BLOG_ITEM).length).toBe(
        blogs.length,
      )
    })
  })
})
