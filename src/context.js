import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { invmod, mod } from 'mathjs'

const twoPi = 2 * Math.PI

//

const ConfigContext = createContext({ })

export const useConfig = () => useContext(ConfigContext)

export const ConfigProvider = ({ children }) => {
  const [generator, setGenerator] = useState(null)
  const [params, setParams] = useState({ a: 1, b: 1})
  const [modulus, setModulus] = useState(5)

  const modP = useCallback(x => mod(x, modulus), [modulus])

  useEffect(() => {
    setGenerator(null)
    setParams({
      a: modP(params.a),
      b: modP(params.b),
    })
  }, [modulus, params.a, params.b])

  const setParam = (param, newValue) => {
    setParams({
      ...params,
      [param]: modP(newValue),
    })
  }

  const scalars = useMemo(() => [...Array(modulus).keys()], [modulus])

  const check = useCallback(({ x, y }) => {
    return modP(x**3 + params.a * x + params.b - y ** 2) === 0
  }, [params.a, params.b, scalars])

  const equationLatex = useMemo(() => {
    return `y^2 = x^3 
      ${ params.a === 0 ? '' : `+ ${ params.a === 1 ? '' : params.a }x` }
      ${ params.b === 0 ? '' : `+ ${ params.b }`
    }`
  }, [modulus, params.a, params.b])

  const homogenizationLatex = useMemo(() => {
    return `F(x,y,z) = y^2z - x^3 
      ${ params.a === 0 ? '' : `- ${ params.a === 1 ? '' : params.a }xz^2` }
      ${ params.b === 0 ? '' : `- ${ params.b }z^3`
    }`
  }, [modulus, params.a, params.b])

  const graph = useMemo(() => scalars.reduce((allCells, col, j) => [
    ...allCells,
    ...scalars.map((row, i) => {
      const u = i / modulus * twoPi
      const v = j / modulus * twoPi

      return {
        x: col, y: row,
        torusCoordinates: {
          x: (2 + 1 * Math.cos(v)) * Math.cos(u),   // x = (majorRadius + minorRadius * cos(v)) * cos(u),
          y: (2 + 1 * Math.cos(v)) * Math.sin(u),   // y = (majorRadius + minorRadius * cos(v)) * sin(u),
          z: 1 * Math.sin(v),                       // z = minorRadius * sin(v),
        }
      }
    }).filter(check)
  ], []), [params.a, params.b, scalars])


  const modInverse = useCallback(a => invmod(a, modulus), [modulus])
   
  const discriminant = useMemo(() => {
    return (4 * params.a**3 + 27 * params.b**2) & modulus
  }, [modulus, params.a, params.b])

  const slopeAt = useCallback(p => {
    if (!p || !check(p)) { return null }
    const num = (3 * p.x ** 2 + params.a)
    const den = (2 * p.y)
    return (num * modInverse(den))
  }, [generator])

  const slopeBetween = useCallback((p, q) => {
    if (!p || !q) { return null }
    if (p.x !== q.x) {
      return modP((p.y - q.y) * modInverse(p.x - q.x))
    }
    if (p.x === q.x && p.y !== q.y) {
      return Infinity
    }
    return slopeAt(p)
  }, [generator])

  const addPoints = (p, q) => {
    // ensure points exist and are indeed on the curve
    if (!p || !q || !check(p) || !check(q)) {
      return null
    }
    const m = modP(slopeBetween(p, q))
    const x = modP((m**2 - p.x - q.x))
    const y = modP((m * (p.x - x) - p.y))
    let sum = { x: x, y: y }
    return sum
  }

  const subgroup = useMemo(() => {
    if (!generator) {
      return []
    }
    let elements = [generator]
    let prevPoint = generator
    let nextPoint = addPoints(prevPoint, generator)
    // as long as the next point is non (NaN, Nan),
    // we'll add them to our subgroup array and press on.
    while (
      nextPoint && !isNaN(nextPoint.x) && !isNaN(nextPoint.y)
      && (nextPoint.x !== generator.x || nextPoint.y !== generator.y)
    ) {
      prevPoint = nextPoint
      elements = [...elements, prevPoint]
      nextPoint = addPoints(prevPoint, generator)
    }
    return elements.map(node => {
      const u = node.y / modulus * twoPi
      const v = node.x / modulus * twoPi
      return {
        ...node,
        torusCoordinates: {
          x: (2 + 1 * Math.cos(v)) * Math.cos(u),   // x = (majorRadius + minorRadius * cos(v)) * cos(u),
          y: (2 + 1 * Math.cos(v)) * Math.sin(u),   // y = (majorRadius + minorRadius * cos(v)) * sin(u),
          z: 1 * Math.sin(v),                       // z = minorRadius * sin(v),
        }
      }
    })
  }, [generator])

  return (
    <ConfigContext.Provider value={{
      modulus, setModulus, modInverse,
      generator, setGenerator, subgroup,
      params, setParam, discriminant,
      equationLatex, homogenizationLatex, scalars, graph, slopeAt, addPoints,
      check, 
    }}>
      { children }
    </ConfigContext.Provider>
  )
}

ConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
