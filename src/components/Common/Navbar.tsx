'use client'

import { ThemeToggler } from '@/components/Common/ThemeToggler'
import { useTheme } from '@/context/ThemeProvider'
import { TestID } from '@/resources/TestID'
import lightModeIcon from '../../resources/images/common/light-mode.svg'
import darkModeIcon from '../../resources/images/common/dark-mode.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const toggleTheme = useCallback(
    () => setTheme(theme === 'light' ? 'dark' : 'light'),
    [theme, setTheme],
  )

  return (
    <nav
      data-testid={TestID.NAVBAR}
      className="navbar navbar-expand-lg bg-body-tertiary"
    >
      <div className="container">
        <Link
          href="/"
          className="unstyled title fw-bold d-flex align-items-center text-body"
        >
          <div>mikan</div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-collapse-target"
          aria-label="Toggle navigation"
          data-testid={TestID.NAVBAR_TOGGLER_BUTTON}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse ms-4"
          id="navbar-collapse-target"
        >
          <ul data-testid={TestID.NAVBAR_NAV_BUTTONS} className="navbar-nav w-100">
            <li className="nav-item">
              <Link className="nav-link active" href="/skills">
                技術スタック
              </Link>
            </li>
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
                onClick={toggleTheme}
                className="nav-link active w-100"
              >
                <div className="on-light d-flex align-items-center">
                  <Image
                    src={lightModeIcon}
                    alt="light mode"
                    width={24}
                    height={24}
                    className="me-1"
                  />
                  ライトモード
                </div>
                <div className="on-dark d-flex align-items-center">
                  <Image
                    src={darkModeIcon}
                    alt="dark mode"
                    width={24}
                    height={24}
                    className="me-1"
                  />
                  ダークモード
                </div>
              </button>
            </li>
          </ul>
          <div className="nav-item d-none d-lg-block">
            <ThemeToggler toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>
    </nav>
  )
}
