import { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

export const GraphGrid = ({ n, width, cells, onClickCell }) => {
  const [activeColumn, setActiveColumn] = useState(null)
  const [activeRow, setActiveRow] = useState(null)
  const margin = 20
  const gridWidth = width - 2 * margin

  const cellWidth = useMemo(() => gridWidth / n, [n])
  const scalars = useMemo(() => [...Array(n).keys()], [n])

  const handleHoverGraphCell = event => {
    setActiveColumn(event.target.dataset.x)
    setActiveRow(event.target.dataset.y)
  }

  const handleLeaveGraphCell = () => {
    setActiveColumn(null)
    setActiveRow(null)
  }

  const axisLabelProps = {
    fill: 'slategrey',
    fontSize: 'smaller',
    textAnchor: 'middle',
    dominantBaseline: 'middle',
  }

  const sharedCellProps = {
    width: cellWidth,
    height: cellWidth,
  }

  // background grid
  const GridLines = useCallback(() => {
    return scalars.concat(n).reduce((lines, x) => {
      return [
        ...lines,
        <line 
          key={ `grid-v-line-${ x }` } 
          className="grid-line"
          x1={ cellWidth * x } x2={ cellWidth * x }
          y1="0" y2={ gridWidth }
        />,
        <line 
          key={ `grid-h-line-${ x }` } 
          className="grid-line"
          x1="0" x2={ gridWidth }
          y1={ cellWidth * x } y2={ cellWidth * x }
        />,
      ]
    }, [])
  }, [cellWidth, scalars])

  // axis labels
  const XAxisLabels = useCallback(() => scalars.map(x => (
    <text
      key={ `x-axis-label${ x }` }
      className={ `x-axis-label-${ x }` }
      x={ x * cellWidth + cellWidth / 2 } y={ -10 }
      { ...axisLabelProps }
    >{ x }</text>
  )), [scalars, cellWidth])

  const YAxisLabels = useCallback(() => scalars.map(y => (
    <text
      key={ `y-axis-label${ y }` }
      className={ `y-axis-label-${ y }` }
      x={ -10 } y={ y * cellWidth + cellWidth / 2 }
      { ...axisLabelProps }
    >{ y }</text>
  )), [scalars, cellWidth])

  // incoming cells
  const GraphCells = useCallback(() => cells.map(cell => 
    <rect
      key={ cell.key }
      className="graph-cell"
      x={ cellWidth * cell.x } y={ cellWidth * cell.y }
      data-x={ cell.x } data-y={ cell.y }
      onClick={ handleClickGraphCell(cell) }
      { ...sharedCellProps }
      { ...cell.rectProps }
      onMouseOver={ handleHoverGraphCell }
      onMouseOut={ handleLeaveGraphCell }
    />
  ), [cells])

  const handleClickGraphCell = cell => () => {
    onClickCell && onClickCell(cell)
  }

  const Highlighting = useCallback(() => {
    if (!activeColumn || !activeRow) {
      return null
    }

    return [
      <rect
        key="column-highlight"
        x={ activeColumn * cellWidth } y={ 0 }
        width={ cellWidth } height={ n * cellWidth }
        fill="#ff02"
      />,
      <rect
        key="row-highlight"
        x={ 0 } y={ activeRow * cellWidth }
        width={ n * cellWidth } height={ cellWidth }
        fill="#ff02"
      />
    ]
  }, [activeColumn, activeRow])

  return (
    <svg
      className="graph"
      width={ gridWidth + 2 * margin }
      height={ gridWidth + 2 * margin }
    >
      <defs>
        <filter id="glow">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#0246" />
        </filter>
      </defs>
      <g transform={ `translate(${ margin } ${ margin })` }>
        <XAxisLabels />
        <YAxisLabels />
        <Highlighting />
        <GridLines />
        <GraphCells />
      </g>
    </svg>
  )
}

GraphGrid.propTypes = {
  n: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  cells: PropTypes.array.isRequired,
  onClickCell: PropTypes.func,
}
