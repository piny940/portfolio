import { ProjectItems } from '@/components/Portfolio/ProjectItems'
import { PortfolioController } from '@/controllers/portfolio_controller'
import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'
import { data } from '../testHelpers/mock'
import { Project } from '@/models/project'

describe('<ProjectsIndex />', () => {
  const controller = new PortfolioController(data)

  it('正常に描画される', async () => {
    const projects: readonly Project[] = controller.getProjects().getProjects()
    const component = render(<ProjectItems projects={projects} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
