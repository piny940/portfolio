import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import TechnologyTag, {
  TechnologyTagProps,
} from '@/components/Portfolio/TechnologyTag'
import { Technology, TechnologyData } from '@/models/technology'

describe('<TechnologyTag />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<TechnologyTagProps>({
      technology: new Technology(Mock.from<TechnologyData>({})),
    })
    const component = render(<TechnologyTag {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
