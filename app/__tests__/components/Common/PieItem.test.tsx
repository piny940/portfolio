import { render, waitFor } from '@testing-library/react'
import { PieItem, PieItemProps } from '@/components/Common/PieItem'
import { Mock } from 'ts-mockery'

describe('<PieItem />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<PieItemProps>({})
    const component = render(<PieItem {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
