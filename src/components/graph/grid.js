import { useCallback, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  Grid, OrbitControls, PlaneGeometry,
} from '@react-three/drei'
import PropTypes from 'prop-types'

const GridCell = ({ color, position }) => {
  return (
    <mesh rotation={ [-Math.PI / 2, 0, 0] } position={ [position[0], 0, position[1]] } >
      <planeGeometry args={ [1, 1] } />
      <meshStandardMaterial color={ color || 'red' } />
    </mesh>
  )
}

GridCell.propTypes = {
  color: PropTypes.string.isRequired,
  position: PropTypes.array.isRequired,
}

//

export const GraphGrid = ({ n, width, cells, onClickCell }) => {
  const [activeColumn, setActiveColumn] = useState(null)
  const [activeRow, setActiveRow] = useState(null)
  const margin = 22
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
    fontSize: 2 * Math.sqrt(cellWidth),
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
    <Canvas camera={{ position: [0, n, 0] }} style={{ backgroundColor: '#fff', border: '1px solid grey', }}>
      <ambientLight />
      <gridHelper args={ [n, n] } />
      <meshStandardMaterial />
      <group position={ [(1 - n)/2, 0, (1 - n)/2] }>
        {
          cells.map(({ x, y }) => (
            <GridCell
              key={ `graph-cell-${ x }-${ y }` }
              color="slategrey"
              position={ [x, y] }
            />
          ))
        }
      </group>
      <OrbitControls />
    </Canvas>
  )
}

GraphGrid.propTypes = {
  n: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  cells: PropTypes.array.isRequired,
  onClickCell: PropTypes.func,
}
