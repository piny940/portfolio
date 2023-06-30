import { Index } from '@/containers/Index'
import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'

describe('<Index />', () => {
  it('Indexが正常に描画される', async () => {
    const component = render(<Index />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
