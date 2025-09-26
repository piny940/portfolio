import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Theme } from '../resources/types'
import { toCookie } from '@/utils/storage'

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

interface ThemeProviderProps {
  children: ReactNode
  initialTheme?: Theme
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme,
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme ?? 'light')

  const value: ThemeContextInterface = {
    theme,
    setTheme,
  }

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-bs-theme', theme)
    toCookie('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export { useTheme, ThemeProvider }
