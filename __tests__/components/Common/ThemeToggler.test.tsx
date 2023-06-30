import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import {
  ThemeToggler,
  ThemeTogglerProps,
} from '@/components/Common/ThemeToggler'
import { Mock } from 'ts-mockery'

describe('<ThemeToggler />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<ThemeTogglerProps>({})
    const component = render(<ThemeToggler {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
