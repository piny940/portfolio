import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'
import { data } from '../testHelpers/mock'
import Projects from '@/containers/Projects'

describe('<Projects />', () => {
  it('正常に描画される', async () => {
    const component = render(<Projects data={data} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
