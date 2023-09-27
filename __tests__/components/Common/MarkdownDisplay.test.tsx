import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { MarkdownDisplay } from '@/components/Common/MarkdownDisplay'

jest.mock('react-markdown/lib/react-markdown', () => ({
  ReactMarkdown: jest.fn(() => undefined),
}))

describe('<MarkdownDisplay />', () => {
  it('正常に描画される', async () => {
    const component = render(<MarkdownDisplay src="/" />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
