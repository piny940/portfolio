import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import { WorkItem, WorkItemProps } from '@/components/Portfolio/WorkItem'
import { WorkType } from '@/resources/types'

describe('<WorkItem />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<WorkItemProps>({
      work: Mock.from<WorkType>({
        github: 'github link',
      }),
    })
    const component = render(<WorkItem {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
