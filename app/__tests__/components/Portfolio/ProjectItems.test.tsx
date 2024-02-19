import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import ProjectItems, {
  ProjectItemsProps,
} from '@/components/Portfolio/ProjectItems'
import { TestID } from '@/resources/TestID'
import { projects } from '../../testHelpers/mock'

describe('<ProjectItems />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<ProjectItemsProps>({
      projects,
      projectIdsWithBlog: [],
    })
    const component = render(<ProjectItems {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
      expect(component.getAllByTestId(TestID.PROJECT_ITEM).length).toBe(
        projects.length
      )
    })
  })
})
