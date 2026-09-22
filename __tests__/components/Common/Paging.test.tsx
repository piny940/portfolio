import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { Paging, PagingProps } from '@/components/Common/Paging'
import { Mock } from 'ts-mockery'
import { TestID } from '@/resources/TestID'

describe('<Paging />', () => {
  it.each`
  name | total | current | items
  ${'中央'} | ${10} | ${5} | ${[3, 4, 5, 6, 7]}
  ${'左端'} | ${10} | ${1} | ${[1, 2, 3, 4, 5]}
  ${'右端'} | ${10} | ${10} | ${[6, 7, 8, 9, 10]}
  ${'唯一'} | ${1} | ${1} | ${[1]}
  ${'左寄り'} | ${10} | ${2} | ${[1, 2, 3, 4, 5]}
  ${'右寄り'} | ${10} | ${9} | ${[6, 7, 8, 9, 10]}
`('現在のページが$nameの場合', async (
    { total, current, items }: { total: number, current: number, items: number[] }) => {
    const props = Mock.from<PagingProps>({ totalPages: total, currentPage: current })
    const component = render(<Paging {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })

    const first = component.getByTestId(TestID.PAGING_FIRST_BUTTON)
    const previous = component.getByTestId(TestID.PAGING_PREVIOUS_BUTTON)
    const next = component.getByTestId(TestID.PAGING_NEXT_BUTTON)
    const last = component.getByTestId(TestID.PAGING_LAST_BUTTON)
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

  it('左にページを進められる', async () => {
    const current = 5
    const setPage = jest.fn()
    const props = Mock.from<PagingProps>({
      totalPages: 10,
      currentPage: current,
      setPageNumber: setPage,
    })
    const component = render(<Paging {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })

    const previous = component.getByTestId(TestID.PAGING_PREVIOUS_BUTTON)
    expect(fireEvent.click(previous.firstChild!)).toBeTruthy()
    expect(setPage).toHaveBeenCalledWith(current - 1)
  })
})
