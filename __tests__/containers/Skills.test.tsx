import { SkillItems, SkillsItemsProps } from '@/components/Portfolio/SkillItems'
import { TechStack } from '@/models/tech_stack'
import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'
import { Mock } from 'ts-mockery'

describe('<Skills />', () => {
  it('Skillsが正常に描画される', async () => {
    const props = Mock.from<SkillsItemsProps>({
      techStacks: [Mock.from<TechStack>({}), Mock.from<TechStack>({})],
    })
    const component = render(<SkillItems {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
