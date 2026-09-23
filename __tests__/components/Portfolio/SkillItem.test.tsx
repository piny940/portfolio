import { render } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import { SkillItemProps, SkillItem } from '@/components/Portfolio/SkillItem'
import { technologies } from '../../testHelpers/mock'

describe('<SkillItem />', () => {
  it('正常に描画される', () => {
    const props = Mock.from<SkillItemProps>({
      technology: technologies[0],
    })
    const component = render(<SkillItem {...props} />)

    expect(component.container.firstChild).toBeTruthy()
  })
})
