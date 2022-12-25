import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'rsuite'
import InfoRoundIcon from '@rsuite/icons/InfoRound'
import TableIcon from '@rsuite/icons/Table'
import { EquationEditor } from '../equation-editor'

export const NavBar = () => {
  return (
    <Navbar className="navbar">
      <Nav>
        <Nav.Item as={ Link } to="/" icon={ <TableIcon /> }>Graph</Nav.Item>
        <Nav.Item as={ Link } to="/info" icon={ <InfoRoundIcon /> }>Info</Nav.Item>
      </Nav>
      <Nav pullRight>
        <EquationEditor />
      </Nav>
    </Navbar>
  )
}
