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
    <div className="bg-body rounded-circle shadow-sm" style={style}>
      <MaterialIcon color={color} name="star" size={size - 5} />
    </div>
  )
}

export default memo(FavoriteIcon)
