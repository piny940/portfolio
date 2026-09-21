import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
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

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    const current
      = (document.documentElement.getAttribute('data-bs-theme') as Theme | null)
        ?? fromCookie('theme') as Theme | null
    if (current === 'dark' || current === 'light') setThemeState(current)
  }, [])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
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
