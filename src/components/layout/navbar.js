import { FlexboxGrid, Header } from 'rsuite'
import { EquationEditor } from '../equation-editor'
import { ModeSelect } from '../mode-select'
import { DrawerToggler } from '../drawer'

export const NavBar = () => {
  return (
    <Header
      as={ FlexboxGrid }
      className="header"
      justify="flex-end"
      align="middle"
    >
      <FlexboxGrid.Item>
        <ModeSelect />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <EquationEditor />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <DrawerToggler />
      </FlexboxGrid.Item>
    </Header>
  )
}
