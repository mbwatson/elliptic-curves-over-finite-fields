import PropTypes from 'prop-types'
import { Container, Content } from 'rsuite'
import { NavBar } from './navbar'
import './index.css'

export const Layout = ({ children }) => {
  return (
     <Container className="app-container">
      <NavBar />
      <Content className="main">
        { children }
      </Content>
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}
