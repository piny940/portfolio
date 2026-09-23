import { render } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import BlogItems, { BlogItemsProps } from '@/components/Portfolio/BlogItems'
import { TestID } from '@/resources/TestID'
import { blogs } from '../../testHelpers/mock'

describe('<BlogItems />', () => {
  it('正常に描画される', () => {
    const props = Mock.from<BlogItemsProps>({ blogs })
    const component = render(<BlogItems {...props} />)

    expect(component.getAllByTestId(TestID.BLOG_ITEM).length).toBe(
      blogs.length,
    )
  })
})
