import { Skills } from '@/containers/Skills'
import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'

jest.mock('@/data/skills', () => ({
  skillsData: [
    {
      name: 'Rails',
      percent: 90,
    },
    {
      name: 'React',
      percent: 100,
    },
  ],
}))

describe('<Skills />', () => {
  it('Skillsが正常に描画される', async () => {
    const component = render(<Skills />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
