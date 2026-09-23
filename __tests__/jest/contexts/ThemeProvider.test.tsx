import { ThemeProvider, useTheme } from '@/context/ThemeProvider'
import { ReactNode } from 'react'
import { renderHook, act } from '@testing-library/react'

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe('<ThemeProvider />', () => {
  afterEach(async () => {
    await act(async () => {
      document.documentElement.removeAttribute('data-bs-theme')
    })
    document.cookie = 'theme=;path=/;max-age=0'
  })

  it('正常にテーマを取得できる', () => {
    document.documentElement.setAttribute('data-bs-theme', 'dark')
    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current.theme).toBe('dark')
  })

  it('正常にテーマを更新できる', async () => {
    document.documentElement.setAttribute('data-bs-theme', 'dark')
    const { result } = renderHook(() => useTheme(), { wrapper })

    await act(async () => {
      result.current.setTheme('light')
    })

    expect(result.current.theme).toBe('light')
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light')
  })
})
