import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import {
  ProjectItem,
  ProjectItemProps,
} from '@/components/Portfolio/ProjectItem'
import { projects } from '../../testHelpers/mock'

describe('<ProjectItem />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<ProjectItemProps>({
      project: projects[0],
    })
    const component = render(<ProjectItem {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
