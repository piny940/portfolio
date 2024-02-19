import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import { SkillItemProps, SkillItem } from '@/components/Portfolio/SkillItem'
import { techStacks } from '../../testHelpers/mock'

describe('<SkillItem />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<SkillItemProps>({
      techStack: techStacks[0],
    })
    const component = render(<SkillItem {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
