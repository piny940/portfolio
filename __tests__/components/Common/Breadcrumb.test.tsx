import { render } from '@testing-library/react'
import { TestID } from '@/resources/TestID'
import Breadcrumb, { BreadcrumbProps, Path } from '@/components/Common/Breadcrumb'
import { Mock } from 'ts-mockery'

describe('<Navbar />', () => {
  it.each`
  pathCount
  ${1}
  ${2}
  `('pathが$pathCount個のとき正しく描画される', ({ pathCount }: { pathCount: number }) => {
    const paths: Path[] = []
    for (let i = 0; i < pathCount; i++) {
      paths.push({ name: `path${i}`, path: `path${i}` })
    }
    const { getAllByTestId } = render(<Breadcrumb paths={paths} />)

    const items = getAllByTestId(TestID.BREADCRUMB_ITEM)
    expect(items.length).toBe(paths.length)
  })
})
