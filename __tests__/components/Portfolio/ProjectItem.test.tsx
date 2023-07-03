import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import {
  ProjectItem,
  ProjectItemProps,
} from '@/components/Portfolio/ProjectItem'
import { ProjectType } from '@/resources/types'

describe('<ProjectItem />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<ProjectItemProps>({
      project: Mock.from<ProjectType>({
        github: 'github link',
      }),
    })
    const component = render(<ProjectItem {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
