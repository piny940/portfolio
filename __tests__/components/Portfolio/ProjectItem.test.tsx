import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import {
  ProjectItem,
  ProjectItemProps,
} from '@/components/Portfolio/ProjectItem'
import { PortfolioController } from '@/controllers/portfolio_controller'
import { data } from '../../testHelpers/mock'

describe('<ProjectItem />', () => {
  const controller = new PortfolioController(data)

  it('正常に描画される', async () => {
    const props = Mock.from<ProjectItemProps>({
      project: controller.getProjects().getProjects()[0],
    })
    const component = render(<ProjectItem {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
