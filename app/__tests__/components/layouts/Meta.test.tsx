import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import Meta, { MetaProps } from '@/layouts/Meta'
import { TestID } from '@/resources/TestID'

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
    await waitFor(() => {
      expect(component.getByTestId(TestID.NO_INDEX)).toBeTruthy()
    })
  })
})
