import { Link } from 'react-router-dom'
import { FlexboxGrid, Header, Nav, Navbar, SelectPicker } from 'rsuite'
import { useConfig } from '../../context'
import { EquationEditor } from '../equation-editor'

export const NavBar = () => {
  const { graphMode, graphModes, setGraphMode } = useConfig()
  const options = Object.keys(graphModes).map(mode => ({ label: mode, value: mode }))

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
            <Nav.Item as={ Link } to="/">Graph</Nav.Item>
          </Nav>
        </Navbar>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item className="right">
        <EquationEditor />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <SelectPicker
          data={ options }
          value={ graphMode }
          searchable={ false }
          cleanable={ false }
          onChange={ setGraphMode }
        />
      </FlexboxGrid.Item>
    </Header>
  )
}
