import { Link } from 'react-router-dom'
import { FlexboxGrid, Header, Navbar, Nav } from 'rsuite'
import InfoRoundIcon from '@rsuite/icons/InfoRound'
import TableIcon from '@rsuite/icons/Table'
import { EquationEditor } from '../equation-editor'

export const NavBar = () => {
  return (
    <Header
      as={ FlexboxGrid }
      className="header"
      justify="space-between"
      align="middle"
    >
      <FlexboxGrid.Item className="left">
        <Navbar className="navbar" appearance="subtle">
          <Nav>
            <Nav.Item as={ Link } to="/" icon={ <TableIcon /> }>Graph</Nav.Item>
            <Nav.Item as={ Link } to="/info" icon={ <InfoRoundIcon /> }>Info</Nav.Item>
          </Nav>
        </Navbar>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item className="right">
        <EquationEditor />
      </FlexboxGrid.Item>
    </Header>
  )
}
