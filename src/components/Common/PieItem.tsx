import styled from 'styled-components'

const PieDiv = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-image: conic-gradient(
    rgb(0, 85, 255),
    #00c3ff 60%,
    rgb(79, 79, 79) 40% 100%
  );
  position: relative;
`
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
  return (
    <PieDiv className={className}>
      <CircleSpan>{label}</CircleSpan>
    </PieDiv>
  )
}
