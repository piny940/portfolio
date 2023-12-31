import { Index } from '@/containers/Index'
import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'
import { data } from '../testHelpers/mock'

describe('<Index />', () => {
  it('Indexが正常に描画される', async () => {
    const component = render(<Index data={data} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
