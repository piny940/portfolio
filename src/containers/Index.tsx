import { PieItem } from '@/components/Common/PieItem'
import { profileData } from '@/data/profile'
import Image from 'next/image'

export const Index: React.FC = () => {
  return (
    <div id="index">
      <div className="d-flex flex-column align-items-center">
        <div className="top-middle d-flex flex-column align-items-center">
          <Image
            src="/images/icon.png"
            alt="icon"
            width={150}
            height={150}
            className="rounded-circle"
          />
          <h1 className="mt-2">Piny940</h1>
          <p className="mt-3 top-profile">{profileData.frontProfile}</p>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center bg-body-tertiary p-5">
        <h2 className="text-center">Skills</h2>
        <div className="row row-cols-1 row-cols-md-2">
          <PieItem label="Rails" percent={90} />
        </div>
      </div>
    </div>
  )
}
