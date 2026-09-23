import { render } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import Badge, { BadgeProps } from '@/components/Portfolio/Badge'

describe('<Badge />', () => {
  it('正常に描画される', () => {
    const props = Mock.from<BadgeProps>({})
    const component = render(<Badge {...props} />)

    expect(component).toBeTruthy()
  })
})
