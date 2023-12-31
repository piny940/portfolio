import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import { PortfolioController } from '@/controllers/portfolio_controller'
import { data } from '../../testHelpers/mock'
import { TestID } from '@/resources/TestID'
import { SkillItems, SkillsItemsProps } from '@/components/Portfolio/SkillItems'

describe('<SkillItems />', () => {
  const controller = new PortfolioController(data)

  it('正常に描画される', async () => {
    const techStacks = controller.techStacks.getTechStacks()
    const props = Mock.from<SkillsItemsProps>({ techStacks })
    const component = render(<SkillItems {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
      expect(component.getAllByTestId(TestID.SKILL_ITEM).length).toBe(
        techStacks.length
      )
    })
  })
})
