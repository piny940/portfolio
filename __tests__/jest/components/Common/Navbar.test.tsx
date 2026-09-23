import { render } from '@testing-library/react'
import { Navbar } from '@/components/Common/Navbar'
import { TestID } from '@/resources/TestID'

describe('<Navbar />', () => {
  it('正常に描画される', () => {
    const { getByTestId } = render(<Navbar />)

    expect(getByTestId(TestID.NAVBAR)).toBeTruthy()
  })
})
