import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'
import Custom404 from '@/pages/404'
import { TestID } from '@/resources/TestID'

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

describe('404 Page', () => {
  it('404ページが正常に表示される', async () => {
    const { getByTestId } = render(<Custom404 />)

    await waitFor(() => {
      expect(getByTestId(TestID.CUSTOM404)).toBeTruthy()
      expect(getByTestId(TestID.NO_INDEX)).toBeTruthy()
    })
  })
})
