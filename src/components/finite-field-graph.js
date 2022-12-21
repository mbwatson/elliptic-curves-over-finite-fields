import { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useApp } from '../context'

const axisLabelProps = {
  fill: 'slategrey',
  fontSize: 'smaller',
  textAnchor: 'middle',
  dominantBaseline: 'middle',
}

export const FiniteFieldGraph = ({ width }) => {
  const { generator, graph, scalars, setGenerator, modulus } = useApp()
  const gridWidth = width
  const cellWidth = useMemo(() => gridWidth / modulus, [modulus])
  const margin = cellWidth

  const sharedCellProps = {
    width: cellWidth,
    height: cellWidth,
    cursor: 'pointer',
  }

  const handleClickGraphCell = ({ x, y }) => () => {
    if (generator && generator.x === x && generator.y === y) {
      setGenerator(null)
      return
    }
    setGenerator({ x, y })
  }

  const XAxis = useCallback(() => scalars.map(col => (
    <text
      key={ `x-axis-label${ col }` }
      x={ col * cellWidth + cellWidth / 2 } y={ -cellWidth / 3 }
      { ...axisLabelProps }
    >{ col }</text>
  )), [scalars, cellWidth])

  const YAxis = useCallback(() => scalars.map(col => (
    <text
      key={ `x-axis-label${ col }` }
      x={ -cellWidth / 2 } y={ col * cellWidth + cellWidth / 2 }
      { ...axisLabelProps }
    >{ col }</text>
  )), [scalars, cellWidth])

  const grid = useMemo(() => scalars.reduce((allCells, col) => {
    return [
      ...allCells,
      ...scalars.map(row => ({
        x: col, _x: cellWidth * col,
        y: row, _y: cellWidth * row,
        style: { fill: '#0152', stroke: 'white' }
      }))
    ]
  }, []), [cellWidth, generator, scalars])

  return (
    <svg
      width={ gridWidth + margin }
      height={ gridWidth + margin }
    >
      <defs>
        <filter id="glow">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#0246" />
        </filter>
      </defs>
      <g transform={ `translate(${ cellWidth } ${ cellWidth })` }>
        <XAxis />
        <YAxis />
        {
          grid.map(cell => 
            <rect
              className="grid-cell"
              key={ `background-cell-${ cell.x }-${ cell.y }` }
              x={ cell._x } y={ cell._y }
              { ...sharedCellProps }
              { ...cell.style }
            />
          )
        }
        {
          graph.map(cell => 
            <rect
              className="graph-cell"
              key={ `cell-${ cell.x }-${ cell.y }` }
              x={ cellWidth * cell.x } y={ cellWidth * cell.y }
              onClick={ handleClickGraphCell(cell) }
              { ...sharedCellProps }
              fill="#0246"
              stroke={ generator && generator.x === cell.x && generator.y === cell.y ? '#f99' : 'transparent' }
              filter={ generator && generator.x === cell.x && generator.y === cell.y ? 'url(#glow)' : 'none' }
              strokeWidth="2"
            />
          )
        }
        {
          generator && (
            <rect
              className="generator-cell"
              key={ `generator-cell-${ generator.x }-${ generator.y }` }
              x={ cellWidth * generator.x } y={ cellWidth * generator.y }
              onClick={ handleClickGraphCell(generator) }
              { ...sharedCellProps }
              fill="transparent"
              stroke="cyan"
              strokeWidth="2"
            />
          )
        }
      </g>
    </svg>
  )
}

FiniteFieldGraph.propTypes = {
  width: PropTypes.number.isRequired,
}
