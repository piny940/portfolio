import { fireEvent, render } from '@testing-library/react'
import { Paging, PagingProps } from '@/components/Common/Paging'
import { Mock } from 'ts-mockery'
import { TestID } from '@/resources/TestID'

describe('<Paging />', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it.each`
  name | total | current | items
  ${'中央'} | ${10} | ${5} | ${[3, 4, 5, 6, 7]}
  ${'左端'} | ${10} | ${1} | ${[1, 2, 3, 4, 5]}
  ${'右端'} | ${10} | ${10} | ${[6, 7, 8, 9, 10]}
  ${'唯一'} | ${1} | ${1} | ${[1]}
  ${'左寄り'} | ${10} | ${2} | ${[1, 2, 3, 4, 5]}
  ${'右寄り'} | ${10} | ${9} | ${[6, 7, 8, 9, 10]}
`('現在のページが$nameの場合', (
    { total, current, items }: { total: number, current: number, items: number[] }) => {
    const props = Mock.from<PagingProps>({ totalPages: total, currentPage: current })
    const component = render(<Paging {...props} />)

    const first = component.getByTestId(TestID.PAGING_FIRST)
    const previous = component.getByTestId(TestID.PAGING_PREVIOUS)
    const next = component.getByTestId(TestID.PAGING_NEXT)
    const last = component.getByTestId(TestID.PAGING_LAST)
    // 左端なら左ボタンはDisabled
    for (const el of [first, previous]) {
      expect(el.classList.contains('disabled')).toBe(current === 1)
    }
    // 右端なら右ボタンはDisabled
    for (const el of [next, last]) {
      expect(el.classList.contains('disabled')).toBe(current === total)
    }
    // itemsに含まれるページしか表示されていない
    for (let page = 1; page <= total; page++) {
      if (items.includes(page)) {
        expect(component.queryByText(page)).toBeTruthy()
      }
      else {
        expect(component.queryByText(page)).toBeFalsy()
      }
    }
  })

  it('左にページを進められる', () => {
    const current = 5
    const setPage = jest.fn()
    const scroll = jest.spyOn(window, 'scroll').mockImplementation(() => {})
    const props = Mock.from<PagingProps>({
      totalPages: 10,
      currentPage: current,
      setPageNumber: setPage,
    })
    const component = render(<Paging {...props} />)

    const previous = component.getByTestId(TestID.PAGING_PREVIOUS)
    expect(fireEvent.click(previous.firstChild!)).toBeTruthy()
    expect(setPage).toHaveBeenCalledWith(current - 1)
    expect(scroll).toHaveBeenCalledWith(0, 0)
  })
})
