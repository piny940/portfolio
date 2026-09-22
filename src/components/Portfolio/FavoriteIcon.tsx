import { CSSProperties, JSX, memo } from 'react'
import starIcon from '../../resources/images/common/star.svg'
import Image from 'next/image'

export type FavoriteIconPros = {
  size: number
}
const FavoriteIcon = ({ size }: FavoriteIconPros): JSX.Element => {
  const style: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    padding: '2px',
  }
  return (
    <div className="bg-body rounded-circle shadow-sm" style={style}>
      <Image src={starIcon} alt="favorite" width={size - 5} height={size - 5} />
    </div>
  )
}

export default memo(FavoriteIcon)
