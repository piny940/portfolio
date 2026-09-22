import lightModeIcon from '../../resources/images/common/light-mode.svg'
import darkModeIcon from '../../resources/images/common/dark-mode.svg'
import Image from 'next/image'
import styles from '@/styles/theme-toggler.module.css'

export type ThemeTogglerProps = {
  toggleTheme: () => void
}

export const ThemeToggler: React.FC<ThemeTogglerProps> = ({ toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={'text-body-emphasis rounded-circle ' + styles.toggler}
    >
      <Image
        src={lightModeIcon}
        alt="light mode"
        width={24}
        height={24}
        className="on-light"
      />
      <Image
        src={darkModeIcon}
        alt="dark mode"
        width={24}
        height={24}
        className="on-dark"
      />
    </button>
  )
}
