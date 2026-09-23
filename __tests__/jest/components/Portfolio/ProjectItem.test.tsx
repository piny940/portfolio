import { render } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import {
  ProjectItem,
  ProjectItemProps,
} from '@/components/Portfolio/ProjectItem'
import { TestID } from '@/resources/TestID'
import { projects } from '../../testHelpers/mock'

describe('<ProjectItem />', () => {
  it('正常に描画される', () => {
    const props = Mock.from<ProjectItemProps>({
      project: projects[0],
    })
    const component = render(<ProjectItem {...props} />)

    expect(component.getByTestId(TestID.PROJECT_ITEM)).toBeTruthy()
  })
})
