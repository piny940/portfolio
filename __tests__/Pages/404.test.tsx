import { render, waitFor } from '@testing-library/react'
import NotFound from '@/app/not-found'
import { TestID } from '@/resources/TestID'

describe('404 Page', () => {
  it('404ページが正常に表示される', async () => {
    const { getByTestId } = render(<NotFound />)

    await waitFor(() => {
      expect(getByTestId(TestID.CUSTOM404)).toBeTruthy()
    })
  })
})
