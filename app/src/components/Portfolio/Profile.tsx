import Image from 'next/image'
import Link from 'next/link'
import githubWhiteIcon from '../../resources/images/common/github-white.png'
import githubIcon from '../../resources/images/common/github.png'
import qiitaIcon from '../../resources/images/common/qiita.png'
import twitterIcon from '../../resources/images/common/x.png'
import twitterWhiteIcon from '../../resources/images/common/x-white.png'
import profileIcon from '../../resources/images/profile/icon.png'
import background from '../../resources/images/profile/background.png'
import styles from '@/styles/profile.module.css'
import { Profile } from '@/content/types'

export type ProfilesProps = {
  profile: Profile
  className?: string
}

export const Profiles: React.FC<ProfilesProps> = ({
  profile,
  className = '',
}) => {
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
          'top-middle d-flex flex-column align-items-center position-relative rounded p-3 bg-body '
          + styles.profile
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
          {profile.name}
          <span className="text-muted fs-6">{`@${profile.handle}`}</span>
        </h1>
        <ul className="list-unstyled mt-2 mb-1 d-flex align-items-center">
          <li>
            <Link
              target="_blank"
              href={profile.links.github}
              className="unstyled mx-1"
            >
              <Image
                src={githubIcon}
                width={31}
                height={31}
                alt="github-icon"
                className="on-light"
                priority
              />
              <Image
                src={githubWhiteIcon}
                width={31}
                height={31}
                alt="github-icon"
                className="on-dark"
                priority
              />
            </Link>
          </li>
          <li>
            <Link
              href={profile.links.qiita}
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
              href={profile.links.x}
              target="_blank"
              className="unstyled mx-1"
            >
              <Image
                priority
                src={twitterIcon}
                width={27}
                height={27}
                alt="x-icon"
                className="on-light"
              />
              <Image
                priority
                src={twitterWhiteIcon}
                width={27}
                height={27}
                alt="x-icon"
                className="on-dark"
              />
            </Link>
          </li>
        </ul>
        <p className="mt-3 top-profile">{profile.description}</p>
      </div>
    </div>
  )
}
