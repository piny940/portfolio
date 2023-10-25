import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'
import { data } from '../testHelpers/mock'
import Skills from '@/containers/Skills'

describe('<Skills />', () => {
  it('Skillsが正常に描画される', async () => {
    const component = render(<Skills data={data} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
