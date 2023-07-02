import { MaterialIcon } from '@/components/Common/MaterialIcon'
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
          <div>Piny940</div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-collapse-target"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse ms-2"
          id="navbar-collapse-target"
        >
          <ul className="navbar-nav d-flex justify-content-between w-100">
            <li className="nav-item">
              <Link className="nav-link" href="/skills">
                Skills
              </Link>
            </li>
            <li className="nav-item d-none d-lg-block">
              <ThemeToggler theme={theme} toggleTheme={toggleTheme()} />
            </li>
            <li className="nav-item d-lg-none">
              <a
                type="button"
                onClick={toggleTheme()}
                className="nav-link d-flex align-items-center"
              >
                {theme === 'light' ? (
                  <>
                    <MaterialIcon className="me-1" name="light_mode" />
                    ライトモード
                  </>
                ) : (
                  <>
                    <MaterialIcon className="me-1" name="dark_mode" />
                    ダークモード
                  </>
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
