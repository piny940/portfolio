import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import { SkillItemProps, SkillItem } from '@/components/Portfolio/SkillItem'
import { data } from '../../testHelpers/mock'
import { PortfolioController } from '@/controllers/portfolio_controller'

describe('<SkillItem />', () => {
  const controller = new PortfolioController(data)

  it('正常に描画される', async () => {
    const props = Mock.from<SkillItemProps>({
      techStack: controller.techStacks.getTechStacks()[0],
    })
    const component = render(<SkillItem {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
