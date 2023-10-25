import { useTheme } from '@/context/ThemeProvider'
import { Profile } from '@/models/profile'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import githubWhiteIcon from '../../resources/images/common/github-white.png'
import githubIcon from '../../resources/images/common/github.png'
import qiitaIcon from '../../resources/images/common/qiita.png'
import profileIcon from '../../resources/images/profile/icon.png'
import background from '../../resources/images/profile/background.png'

const BgDiv = styled.div`
  opacity: 0.3;
`

const ProfileDiv = styled.div`
  border-top-width: 10px;
  border-style: solid;
  border-image: linear-gradient(
    to right,
    rgb(48, 117, 255) 0%,
    rgb(45, 219, 208) 100%
  );
  border-image-slice: 1;
  max-width: 90%;
`

export type ProfilesProps = {
  className?: string
  profile: Profile
}

export const Profiles: React.FC<ProfilesProps> = ({
  className = '',
  profile,
}) => {
  const { theme } = useTheme()

  return (
    <div
      className={
        'd-flex flex-column align-items-center position-relative ' + className
      }
    >
      <BgDiv className="position-absolute w-100 h-100 d-none d-sm-block">
        <Image alt="背景画像" src={background} className="w-100 h-100" />
      </BgDiv>
      <ProfileDiv className="top-middle d-flex flex-column align-items-center position-relative rounded p-3 bg-body">
        <Image
          src={profileIcon}
          alt="icon"
          width={150}
          height={150}
          className="rounded-circle"
        />
        <h1 className="mt-2">Piny940</h1>
        <ul className="list-unstyled mt-2 mb-1 d-flex align-items-center">
          <li>
            <Link
              target="_blank"
              href={profile.getGithub()}
              className="unstyled mx-1"
            >
              <Image
                src={theme === 'light' ? githubIcon : githubWhiteIcon}
                width={31}
                height={31}
                alt="github-icon"
              />
            </Link>
          </li>
          <li>
            <Link
              href={profile.getQiita()}
              target="_blank"
              className="unstyled mx-1"
            >
              <Image src={qiitaIcon} width={31} height={31} alt="qiita-icon" />
            </Link>
          </li>
        </ul>
        <p className="mt-3 top-profile">{profile.getFrontDescription()}</p>
      </ProfileDiv>
    </div>
  )
}
