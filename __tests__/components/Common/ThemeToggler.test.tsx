import { render } from '@testing-library/react'
import {
  ThemeToggler,
  ThemeTogglerProps,
} from '@/components/Common/ThemeToggler'
import { Mock } from 'ts-mockery'

describe('<ThemeToggler />', () => {
  it('正常に描画される', () => {
    const props = Mock.from<ThemeTogglerProps>({})
    const component = render(<ThemeToggler {...props} />)

    expect(component.container.firstChild).toBeTruthy()
  })
})
