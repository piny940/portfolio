import { render, waitFor } from '@testing-library/react'
import Custom500 from '@/pages/500'
import { TestID } from '@/resources/TestID'

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

describe('500 Page', () => {
  it('500ページが正常に表示される', async () => {
    const { getByTestId } = render(<Custom500 />)

    await waitFor(() => {
      expect(getByTestId(TestID.CUSTOM500)).toBeTruthy()
    })
  })
})
