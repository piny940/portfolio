import styled from 'styled-components'

const CircleSpan = styled.span`
  width: 160px;
  height: 160px;
  background-color: white;
  position: absolute;
  border-radius: 50%;
  top: 20px;
  left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`

export type PieItemProps = {
  percent: number
  label: string
  className?: string
}

export const PieItem: React.FC<PieItemProps> = ({
  percent,
  label,
  className,
}) => {
  const start = [0, 85, 255]
  const end = [0, 255, 238]
  const color = end.map((v, i) => start[i] + ((v - start[i]) * percent) / 100)
  const PieDiv = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-image: conic-gradient(
      rgb(${start[0]}, ${start[1]}, ${start[2]}),
      rgb(${color[0]}, ${color[1]}, ${color[2]}) ${percent}%,
      rgb(79, 79, 79) ${percent}% 100%
    );
    position: relative;
  `

  return (
    <PieDiv className={className}>
      <CircleSpan>{label}</CircleSpan>
    </PieDiv>
  )
}
