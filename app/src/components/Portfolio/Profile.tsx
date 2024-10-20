import { useTheme } from '@/context/ThemeProvider'
import Image from 'next/image'
import Link from 'next/link'
import githubWhiteIcon from '../../resources/images/common/github-white.png'
import githubIcon from '../../resources/images/common/github.png'
import qiitaIcon from '../../resources/images/common/qiita.png'
import twitterIcon from '../../resources/images/common/x.png'
import twitterWhiteIcon from '../../resources/images/common/x-white.png'
import profileIcon from '../../resources/images/profile/icon.png'
import background from '../../resources/images/profile/background.png'
import styles from '@/styles/profile.module.scss'

export type ProfilesProps = {
  className?: string
}

export const Profiles: React.FC<ProfilesProps> = ({ className = '' }) => {
  const { theme } = useTheme()

  return (
    <div
      className={
        'd-flex flex-column align-items-center position-relative ' + className
      }
    >
      <div
        className={
          'position-absolute w-100 h-100 d-none d-sm-block ' + styles.bgWrapper
        }
      >
        <Image
          priority
          alt="背景画像"
          src={background}
          className="w-100 h-100"
        />
      </div>
      <div
        className={
          'top-middle d-flex flex-column align-items-center position-relative rounded p-3 bg-body ' +
          styles.profile
        }
      >
        <Image
          src={profileIcon}
          alt="icon"
          width={150}
          height={150}
          className="rounded-circle"
          priority
        />
        <h1 className="d-flex flex-column align-items-center mt-2">
          mikan
          <span className="text-muted fs-6">@piny940</span>
        </h1>
        <ul className="list-unstyled mt-2 mb-1 d-flex align-items-center">
          <li>
            <Link
              target="_blank"
              href="https://github.com/piny940"
              className="unstyled mx-1"
            >
              <Image
                src={theme === 'light' ? githubIcon : githubWhiteIcon}
                width={31}
                height={31}
                alt="github-icon"
                priority
              />
            </Link>
          </li>
          <li>
            <Link
              href="https://qiita.com/piny940"
              target="_blank"
              className="unstyled mx-1"
            >
              <Image
                priority
                src={qiitaIcon}
                width={31}
                height={31}
                alt="qiita-icon"
              />
            </Link>
          </li>
          <li>
            <Link
              href="https://x.com/piny940"
              target="_blank"
              className="unstyled mx-1"
            >
              <Image
                priority
                src={theme === 'light' ? twitterIcon : twitterWhiteIcon}
                width={27}
                height={27}
                alt="x-icon"
              />
            </Link>
          </li>
        </ul>
        <p className="mt-3 top-profile">
          大学進学と共にプログラミングの勉強を始め、主にRails・Reactを用いてインターン/個人の趣味開発でwebアプリの開発を行っています。
        </p>
      </div>
    </div>
  )
}
