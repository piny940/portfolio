import { MaterialIcon } from './MaterialIcon'
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
      <MaterialIcon className="on-light" name="light_mode" />
      <MaterialIcon className="on-dark" name="dark_mode" />
    </button>
  )
}
