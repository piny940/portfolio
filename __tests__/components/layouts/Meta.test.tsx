import { render } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import Meta, { MetaProps } from '@/layouts/Meta'

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

describe('<Meta />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<MetaProps>({})
    const component = render(<Meta {...props} />)
    expect(component).toBeTruthy()
  })

  it('noindexが正常に付与される', async () => {
    const props = Mock.from<MetaProps>({ noIndex: true })
    const component = render(<Meta {...props} />)
    expect(component).toBeTruthy()
  })
})
