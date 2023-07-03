import { Projects, ProjectsProps } from '@/containers/Projects'
import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'
import { Mock } from 'ts-mockery'

describe('<Projects />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<ProjectsProps>({})
    const component = render(<Projects {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
