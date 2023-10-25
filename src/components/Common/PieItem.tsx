import { ReactNode } from 'react'
import styled from 'styled-components'

const CircleDiv = styled.div`
  width: 160px;
  height: 160px;
  background-color: white;
  position: absolute;
  border-radius: 50%;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`

const PieDiv = styled.div<{
  start: number[]
  end: number[]
  percent: number
}>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-image: conic-gradient(
    ${(
      props
    ) => `rgb(${props.start[0]}, ${props.start[1]}, ${props.start[2]}), rgb(${props.end[0]}, ${props.end[1]}, ${props.end[2]}) ${props.percent}%,
    rgb(79, 79, 79) ${props.percent}% 100%`}
  );
  position: relative;
`

export type PieItemProps = {
  percent: number
  children: ReactNode
  className?: string
  innerClassName?: string
  testId?: string
}

export const PieItem: React.FC<PieItemProps> = ({
  percent,
  children,
  className,
  innerClassName,
  testId,
}) => {
  const start = [0, 85, 255]
  const end = [0, 255, 238]
  const color = end.map((v, i) => start[i] + ((v - start[i]) * percent) / 100)

  return (
    <PieDiv
      data-testid={testId}
      start={start}
      end={color}
      percent={percent}
      className={className}
    >
      <CircleDiv className={innerClassName}>{children}</CircleDiv>
    </PieDiv>
  )
}
