import { render, waitFor } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import FavoriteIcon, {
  FavoriteIconPros,
} from '@/components/Portfolio/FavoriteIcon'

describe('<FavoriteIcon />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<FavoriteIconPros>({})
    const component = render(<FavoriteIcon {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
