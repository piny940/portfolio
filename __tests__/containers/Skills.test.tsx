import { SkillItems } from '@/components/Portfolio/SkillItems'
import { PortfolioController } from '@/controllers/portfolio_controller'
import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'
import { data } from '../testHelpers/mock'

describe('<Skills />', () => {
  const controller = new PortfolioController(data)

  it('Skillsが正常に描画される', async () => {
    const component = render(
      <SkillItems techStacks={controller.getTechStacks().getTechStacks()} />
    )

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
