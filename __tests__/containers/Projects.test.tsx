import {
  ProjectItems,
  ProjectsIndexProps,
} from '@/components/Portfolio/ProjectItems'
import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'
import { Mock } from 'ts-mockery'

describe('<ProjectsIndex />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<ProjectsIndexProps>({})
    const component = render(<ProjectItems {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
