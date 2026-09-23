import { render } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import BlogItem, { BlogItemProps } from '@/components/Portfolio/BlogItem'
import { TestID } from '@/resources/TestID'
import { blogs } from '../../testHelpers/mock'

describe('<BlogItem />', () => {
  it('正常に描画される', () => {
    const blog = blogs[0]
    const props = Mock.from<BlogItemProps>({
      blog,
    })
    const component = render(<BlogItem {...props} />)

    expect(component.getAllByTestId(TestID.TECHNOLOGY_BADGE).length).toBe(
      blog.tags.length,
    )
  })
})
