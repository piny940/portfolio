import { ThemeProvider, useTheme } from '@/context/ThemeProvider'
import { ReactNode } from 'react'
import { renderHook, waitFor, act } from '@testing-library/react'

describe('<ThemeProvider />', () => {
  it('正常にテーマを取得できる', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => {
      return <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
    }
    const { result } = renderHook(() => useTheme(), { wrapper: wrapper })

    await waitFor(() => {
      expect(result.current.theme).toBe('dark')
    })
  })
  it('正常にテーマを更新できる', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => {
      return <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
    }
    const { result } = renderHook(() => useTheme(), { wrapper: wrapper })

    act(() => {
      result.current.setTheme('light')
    })
    await waitFor(() => {
      expect(result.current.theme).toBe('light')
    })
  })
})
