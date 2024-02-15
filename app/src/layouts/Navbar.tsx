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
  }, [theme, setTheme])

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
          className="unstyled title fw-bold d-flex align-items-center text-body"
        >
          <div>piny940</div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-collapse-target"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse ms-4"
          id="navbar-collapse-target"
        >
          <ul className="navbar-nav w-100">
            <li className="nav-item">
              <Link className="nav-link active" href="/skills">
                技術スタック
              </Link>
            </li>{' '}
            <li className="nav-item">
              <Link className="nav-link active" href="/projects">
                プロジェクト
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" href="/blogs">
                ブログ一覧
              </Link>
            </li>
            <li className="nav-item d-lg-none">
              <button
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
              </button>
            </li>
          </ul>
          <div className="nav-item d-none d-lg-block">
            <ThemeToggler theme={theme} toggleTheme={toggleTheme()} />
          </div>
        </div>
      </div>
    </nav>
  )
}
