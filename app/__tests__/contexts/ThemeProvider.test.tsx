import { ThemeProvider, useTheme } from '@/context/ThemeProvider'
import { ReactNode } from 'react'
import { renderHook, waitFor, act } from '@testing-library/react'

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe('<ThemeProvider />', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-bs-theme')
    document.cookie = 'theme=;path=/;max-age=0'
  })

  it('正常にテーマを取得できる', async () => {
    document.documentElement.setAttribute('data-bs-theme', 'dark')
    const { result } = renderHook(() => useTheme(), { wrapper })

    await waitFor(() => {
      expect(result.current.theme).toBe('dark')
    })
  })

  it('正常にテーマを更新できる', async () => {
    document.documentElement.setAttribute('data-bs-theme', 'dark')
    const { result } = renderHook(() => useTheme(), { wrapper })

    act(() => {
      result.current.setTheme('light')
    })
    await waitFor(() => {
      expect(result.current.theme).toBe('light')
      expect(document.documentElement.getAttribute('data-bs-theme')).toBe(
        'light',
      )
    })
  })
})
