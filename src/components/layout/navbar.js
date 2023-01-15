import { FlexboxGrid, Header } from 'rsuite'
import { EquationEditor } from '../equation-editor'
import { ModeSelect } from '../mode-select'

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
    </Header>
  )
}
