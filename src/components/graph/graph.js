import { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'

const axisLabelProps = {
  fill: 'slategrey',
  fontSize: 'smaller',
  textAnchor: 'middle',
  dominantBaseline: 'middle',
}

export const FiniteFieldGraph = ({ n, width, cells, onClickCell }) => {
  const margin = 20
  const gridWidth = width - margin

  const cellWidth = useMemo(() => gridWidth / n, [n])
  const scalars = useMemo(() => [...Array(n).keys()], [n])

  const sharedCellProps = {
    width: cellWidth,
    height: cellWidth,
  }

  const XAxis = useCallback(() => scalars.map(col => (
    <text
      key={ `x-axis-label${ col }` }
      x={ col * cellWidth + cellWidth / 2 } y={ -10 }
      { ...axisLabelProps }
    >{ col }</text>
  )), [scalars, cellWidth])

  const YAxis = useCallback(() => scalars.map(col => (
    <text
      key={ `x-axis-label${ col }` }
      x={ -10 } y={ col * cellWidth + cellWidth / 2 }
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
  }, []), [cellWidth, scalars])

  const handleClickGraphCell = cell => () => {
    if (!onClickCell) {
      return
    }
    onClickCell(cell)
  }

  return (
    <svg
      className="graph"
      width={ gridWidth + margin }
      height={ gridWidth + margin }
    >
      <defs>
        <filter id="glow">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#0246" />
        </filter>
      </defs>
      <g transform={ `translate(${ margin } ${ margin })` }>
        <XAxis />
        <YAxis />
        {
          // background grid
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
          // incoming cells
          cells.map(cell => 
            <rect
              className="graph-cell"
              key={ `cell-${ cell.x }-${ cell.y }` }
              x={ cellWidth * cell.x } y={ cellWidth * cell.y }
              onClick={ handleClickGraphCell(cell) }
              { ...sharedCellProps }
              { ...cell.rectProps }
              strokeWidth="2"
            />
          )
        }
      </g>
    </svg>
  )
}

FiniteFieldGraph.propTypes = {
  n: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  cells: PropTypes.array.isRequired,
  onClickCell: PropTypes.func,
}
