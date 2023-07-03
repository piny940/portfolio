import { Works, WorksProps } from '@/containers/Projects'
import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'
import { Mock } from 'ts-mockery'

describe('<Works />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<WorksProps>({})
    const component = render(<Works {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
