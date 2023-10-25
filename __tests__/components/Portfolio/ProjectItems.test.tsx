import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import ProjectItems, {
  ProjectItemsProps,
} from '@/components/Portfolio/ProjectItems'
import { PortfolioController } from '@/controllers/portfolio_controller'
import { data } from '../../testHelpers/mock'
import { TestID } from '@/resources/TestID'

describe('<ProjectItems />', () => {
  const controller = new PortfolioController(data)

  it('正常に描画される', async () => {
    const projects = controller.projects.getProjects()
    const props = Mock.from<ProjectItemsProps>({ projects })
    const component = render(<ProjectItems {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
      expect(component.getAllByTestId(TestID.PROJECT_ITEM).length).toBe(
        projects.length
      )
    })
  })
})
