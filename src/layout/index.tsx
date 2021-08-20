import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { DeviceProvider } from 'src/contexts/device'

type LayoutProps = {
  children: ReactNode
}

const Container = styled.div`
  font-family: Jost, sans-serif;
  text-align: center;
  min-height: 100vh;
  text-align: center;
  background-color: #222f3e;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #c8d6e5;

  a {
    color: #0abde3;
  }
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  text-transform: uppercase;
`

const Header = styled.header`
  display: flex;
  justify-content: center;
  padding: 32px;
`

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px;

  p {
    margin: 0.25em 0;
  }
`

const Layout = ({ children }: LayoutProps) => (
  <DeviceProvider>
    <Container>
      <Header>
        <Link to="/">
          <Title>WikiMorty React App</Title>
        </Link>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <p>Just a simple React app!</p>
        <p>
          <a href="https://github.com/sylvaindubus/wikimorty">Code source </a>
        </p>
      </Footer>
    </Container>
  </DeviceProvider>
)

export default Layout
