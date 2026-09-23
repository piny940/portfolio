import { render } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import { TestID } from '@/resources/TestID'
import {
  SkillItems,
  SkillsItemsProps,
} from '@/components/Portfolio/SkillItems'
import { technologies } from '../../testHelpers/mock'

describe('<SkillItems />', () => {
  it('正常に描画される', () => {
    const props = Mock.from<SkillsItemsProps>({ technologies })
    const component = render(<SkillItems {...props} />)

    expect(component.getAllByTestId(TestID.SKILL_ITEM).length).toBe(
      technologies.length,
    )
  })
})
