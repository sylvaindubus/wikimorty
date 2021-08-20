import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
`

const Wrapper = styled.svg`
  width: 96px;
  height: 96px;
  margin: 32px;
  animation: ${rotate} 2s linear infinite;
`

const Circle = styled.circle`
  stroke: #0abde3;
  stroke-linecap: round;
  stroke-width: 3px;
  animation: ${dash} 1.5s ease-in-out infinite;
`

const Spinner = () => (
  <Wrapper viewBox="0 0 50 50">
    <Circle cx="25" cy="25" r="20" fill="none"></Circle>
  </Wrapper>
)

export default Spinner
