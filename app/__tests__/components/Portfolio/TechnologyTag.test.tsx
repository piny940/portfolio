import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import TechnologyTag, {
  TechnologyTagProps,
} from '@/components/Portfolio/TechnologyTag'
import { data } from '../../testHelpers/mock'

describe('<TechnologyTag />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<TechnologyTagProps>({
      technology: data.technologies[0],
    })
    const component = render(<TechnologyTag {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
