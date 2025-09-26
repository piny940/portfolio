import { Theme } from '@/resources/types'
import { MaterialIcon } from './MaterialIcon'
import styles from '@/styles/theme-toggler.module.scss'

export type ThemeTogglerProps = {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeToggler: React.FC<ThemeTogglerProps> = ({
  theme,
  toggleTheme,
}) => {
  return (
    <button
      onClick={toggleTheme}
      className={'text-body-emphasis rounded-circle ' + styles.toggler}
    >
      {theme === 'light'
        ? (
            <MaterialIcon name="light_mode" />
          )
        : (
            <MaterialIcon name="dark_mode" />
          )}
    </button>
  )
}
