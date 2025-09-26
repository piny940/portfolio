import { render, waitFor } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import Badge, { BadgeProps } from '@/components/Portfolio/Badge'

describe('<Badge />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<BadgeProps>({})
    const component = render(<Badge {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
