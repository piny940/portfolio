import { render } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import ErrorPage, { ErrorPageProps } from '@/app/error'
import { TestID } from '@/resources/TestID'

describe('500 Page', () => {
  it('500ページが正常に表示される', () => {
    const props = Mock.from<ErrorPageProps>({
      error: { message: 'test' },
      reset: jest.fn(),
    })
    const { getByTestId } = render(<ErrorPage {...props} />)

    expect(getByTestId(TestID.CUSTOM500)).toBeTruthy()
  })
})
