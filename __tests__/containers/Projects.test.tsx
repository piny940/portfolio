import { ProjectsIndex, ProjectsIndexProps } from '@/containers/Projects'
import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'
import { Mock } from 'ts-mockery'

describe('<ProjectsIndex />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<ProjectsIndexProps>({})
    const component = render(<ProjectsIndex {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
