import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type ErrorMessageProps = {
  children: ReactNode
}

const Wrapper = styled.div`
  text-align: center;
`

const Headline = styled.p`
  font-size: 6rem;
  margin: 0;
`

const Message = styled.p`
  font-size: 2rem;
  margin: 0.5em 0 2em;
`

const ErrorMessage = ({ children }: ErrorMessageProps) => (
  <Wrapper>
    <Headline>Oops!</Headline>
    <Message>{children}</Message>
    <Link to="/">Let's go back</Link>
  </Wrapper>
)

export default ErrorMessage
