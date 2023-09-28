import { CSSProperties, memo } from 'react'
import { MaterialIcon } from '../Common/MaterialIcon'

export type FavoriteIconPros = {
  size: number
  color?: string
}
const FavoriteIcon = ({
  size,
  color = 'orange',
}: FavoriteIconPros): JSX.Element => {
  const style: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    padding: '2px',
  }
  return (
    <div className="bg-white rounded-circle border" style={style}>
      <MaterialIcon color={color} name="star" size={size - 5} />
    </div>
  )
}

export default memo(FavoriteIcon)
