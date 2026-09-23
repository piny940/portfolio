import { render } from '@testing-library/react'
import { PageItem, PageItemProps } from '@/components/Common/PageItem'
import { Mock } from 'ts-mockery'

describe('<PageItem />', () => {
  it('正常に描画される', () => {
    const props = Mock.from<PageItemProps>({})
    const component = render(<PageItem {...props} />)

    expect(component).toBeTruthy()
  })
})
