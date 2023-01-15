import { IconButton } from 'rsuite'
import MenuIcon from '@rsuite/icons/Menu'
import { useDrawer } from './'

export const DrawerToggler = () => {
  const drawer = useDrawer()
  const handleClickButton = () => {
    drawer.toggle()
  }

  return (
    <IconButton
      icon={ <MenuIcon /> }
      onClick={ handleClickButton }
    />
  )
}
