import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import { data } from '../../testHelpers/mock'
import { TestID } from '@/resources/TestID'
import { SkillItems, SkillsItemsProps } from '@/components/Portfolio/SkillItems'

describe('<SkillItems />', () => {
  it('正常に描画される', async () => {
    const techStacks = data.techStacks
    const props = Mock.from<SkillsItemsProps>({ techStacks })
    const component = render(<SkillItems {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
      expect(component.getAllByTestId(TestID.SKILL_ITEM).length).toBe(
        techStacks.length
      )
    })
  })
})
