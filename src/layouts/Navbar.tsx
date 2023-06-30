import { ThemeToggler } from '@/components/Common/ThemeToggler'
import { useTheme } from '@/context/ThemeProvider'
import { TestID } from '@/resources/TestID'
import Link from 'next/link'
import { useCallback } from 'react'

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const toggleTheme = useCallback(() => {
    return () => {
      setTheme(theme === 'light' ? 'dark' : 'light')
    }
  }, [theme])

  return (
    <nav
      data-testid={TestID.NAVBAR}
      className={
        'navbar navbar-expand-lg ' +
        (theme === 'light' ? 'navbar-light bg-light ' : 'navbar-dark bg-dark')
      }
    >
      <div className="container-fluid px-5">
        <Link
          href="/"
          className="title fw-bold d-flex align-items-center text-body"
        >
          <div>Next Template</div>
        </Link>
        <ThemeToggler theme={theme} toggleTheme={toggleTheme()} />
      </div>
    </nav>
  )
}
