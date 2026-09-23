import { render } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import FavoriteIcon, {
  FavoriteIconPros,
} from '@/components/Portfolio/FavoriteIcon'

describe('<FavoriteIcon />', () => {
  it('正常に描画される', () => {
    const props = Mock.from<FavoriteIconPros>({})
    const component = render(<FavoriteIcon {...props} />)

    expect(component).toBeTruthy()
  })
})
