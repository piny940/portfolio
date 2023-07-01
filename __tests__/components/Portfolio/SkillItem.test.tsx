import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import { SkillItemProps, SkillItem } from '@/components/Portfolio/SkillItem'
import { SkillType } from '@/resources/types'

describe('<SkillItem />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<SkillItemProps>({
      skill: Mock.from<SkillType>({ name: 'Rails', percent: 90 }),
    })
    const component = render(<SkillItem {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
