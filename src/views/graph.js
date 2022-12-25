import { Fragment, useMemo, useState } from 'react'
import { Resizable } from 're-resizable'
import { useConfig } from '../context'
import { Details, FiniteFieldGraph, GraphHeader } from '../components/graph'

//

export const GraphView = () => {
  const { generator, setGenerator, subgroup, graph, modulus } = useConfig()
  const [size, setSize] = useState(600)

  const handleResizeStop = (event, dir, ref, d) => {
    setSize(size + d.width)
  }

  const cells = useMemo(() => {
    const graphCells = graph.map(({ x, y }) => ({
      x, y,
      rectProps: generator && generator.x === x && generator.y === y ? ({
        style: { cursor: 'pointer' },
        stroke: 'cyan',
        filter: 'url(#glow)',
        fill:  'darkcyan',
      }) : ({
        style: { cursor: 'pointer' },
        stroke: 'transparent',
        filter: 'none',
        fill: '#0246',
      }),
    })).map(cell => {
      if (subgroup.some(g => g.x === cell.x && g.y === cell.y)) {
        cell.rectProps.fill = 'darkcyan'
      }
      return cell
    })
    return [...graphCells]
  }, [generator, graph])

  return (
    <Fragment>
      <GraphHeader />

      <Resizable
        size={{ width: size, height: size }}
        enable={{
          bottomRight: true, right: true, bottom: true,
          top: false, left: false, topRight: false, bottomLeft: false, topLeft: false,
        }}
        onResizeStop={ handleResizeStop }
        lockAspectRatio
        style={{ backgroundColor: '#eee' }}
      >
        <FiniteFieldGraph
          key={ size }
          width={ size }
          n={ modulus }
          cells={ cells }
          onClickCell={ ({ x, y }) => {
            if (generator && generator.x === x && generator.y === y) {
              setGenerator(null)
              return
            }
            setGenerator({ x, y })
          }}
        />
      </Resizable>

      <Details />
    </Fragment>
  )
}


