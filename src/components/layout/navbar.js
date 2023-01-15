import { Stack, Header } from 'rsuite'
import { EquationEditor } from '../equation-editor'
import { ModeSelect } from '../mode-select'
import { DrawerToggler } from '../drawer'

export const NavBar = () => {
  return (
    <Header
      as={ Stack }
      className="header"
      justify="flex-end"
      align="middle"
      spacing={ 20 }
    >
      <div style={{ flex: 1, textAlign: 'left' }}>
        <ModeSelect />
      </div>
      <EquationEditor />
      <DrawerToggler />
    </Header>
  )
}
