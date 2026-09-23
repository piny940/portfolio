import { render } from '@testing-library/react'
import { MarkdownDisplay } from '@/components/Common/MarkdownDisplay'

describe('<MarkdownDisplay />', () => {
  it('渡したhtmlが描画される', () => {
    const component = render(<MarkdownDisplay html="<h1>Hello</h1>" />)

    const heading = component.getByText('Hello')
    expect(heading.tagName).toBe('H1')
  })
})
