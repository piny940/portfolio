import { profileData } from '@/data/profile'
import Image from 'next/image'
import styled from 'styled-components'

const BgDiv = styled.div`
  background-image: url('/images/profile/background.png');
  background-size: cover;
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
}

export const Profiles: React.FC<ProfilesProps> = ({ className = '' }) => {
  return (
    <div
      className={
        'd-flex flex-column align-items-center position-relative ' + className
      }
    >
      <BgDiv className="position-absolute w-100 h-100"></BgDiv>
      <ProfileDiv className="top-middle d-flex flex-column align-items-center position-relative rounded p-3 bg-body">
        <Image
          src="/images/icon.png"
          alt="icon"
          width={150}
          height={150}
          className="rounded-circle"
        />
        <h1 className="mt-2">Piny940</h1>
        <p className="mt-3 top-profile">{profileData.frontProfile}</p>
      </ProfileDiv>
    </div>
  )
}
