'use client'

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useSyncExternalStore,
} from 'react'
import { Theme } from '../resources/types'
import { fromCookie, toCookie } from '@/utils/storage'

interface ThemeContextInterface {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const defaultThemeState: ThemeContextInterface = {
  theme: 'light',
  setTheme: () => undefined,
}

const ThemeContext = createContext(defaultThemeState)

const useTheme = () => useContext(ThemeContext)

const THEME_COLORS: Record<Theme, string> = {
  light: '#f8f9fa',
  dark: '#212529',
}

const subscribe = (onStoreChange: () => void) => {
  const observer = new MutationObserver(onStoreChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-bs-theme'],
  })
  return () => observer.disconnect()
}

const getSnapshot = (): Theme => {
  const current
    = document.documentElement.getAttribute('data-bs-theme')
      ?? fromCookie('theme')
  return current === 'dark' ? 'dark' : 'light'
}

const getServerSnapshot = (): Theme => 'light'

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute('data-bs-theme', next)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[next])
    toCookie('theme', next)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { useTheme, ThemeProvider }
