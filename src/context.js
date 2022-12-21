import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const AppContext = createContext({ })

export const useApp = () => useContext(AppContext)

export const AppContextProvider = ({ children }) => {
  const [generator, setGenerator] = useState(null)
  const [params, setParams] = useState({ a: 1, b: 1 })
  const [modulus, setModulus] = useState(7)

  useEffect(() => {
    setGenerator(null)
  }, [modulus, params.a, params.b])

  const scalars = useMemo(() => [...Array(modulus).keys()], [modulus])

  const check = useCallback(({ x, y }) => {
    return (x**3 + params.a * x + params.b - y ** 2) % modulus === 0
  }, [params.a, params.b, scalars])

  const graph = useMemo(() => scalars.reduce((allCells, col) => [
    ...allCells,
    ...scalars.map(row => ({ x: col, y: row })).filter(check)
  ], []), [params.a, params.b, scalars])

  const decrement = param => setParams({ ...params, [param]: params[param] - 1 })
  const increment = param => setParams({ ...params, [param]: params[param] + 1 })

  return (
    <AppContext.Provider value={{
      modulus, setModulus,
      generator, setGenerator,
      params, increment, decrement,
      scalars, graph,
      check,
    }}>
      { children }
    </AppContext.Provider>
  )
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
