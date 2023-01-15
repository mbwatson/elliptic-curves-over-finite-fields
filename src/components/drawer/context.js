import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const DrawerContext = createContext({ })

export const useDrawer = () => useContext(DrawerContext)

export const DrawerProvider = ({ children }) => {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(!open)

  console.log(open)

  return (
    <DrawerContext.Provider value={{ open, toggle }}>
      { children }
    </DrawerContext.Provider>
  )
}

DrawerProvider.propTypes = {
  children: PropTypes.node,
}
