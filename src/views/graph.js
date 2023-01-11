import { useMemo, useState } from 'react'
import { Stack } from 'rsuite'
import { Resizable } from 're-resizable'
import { useConfig } from '../context'
import { Details, GraphGrid, Torus } from '../components/graph'

//

export const GraphView = () => {
  const { generator, setGenerator, subgroup, graph, modulus } = useConfig()
  const [size, setSize] = useState(600)

  const handleResizeStop = (event, dir, ref, d) => {
    setSize(size + d.width)
  }

  const cells = useMemo(() => {
    const generatorRectProps = {
      style: { cursor: 'pointer' },
      stroke: 'cyan',
      strokeWidth: 2,
      filter: 'url(#glow)',
      fill:  'transparent',
    }
    const normalRectProps = {
      style: { cursor: 'pointer' },
      stroke: 'transparent',
      filter: 'none',
      fill: '#0246',
    }
    let returnCells = graph.map(({ x, y }) => ({
      x, y,
      rectProps: { ...normalRectProps },
      key: `cell-${ x }-${ y }`,
    })).map(cell => {
      if (subgroup.some(g => g.x === cell.x && g.y === cell.y)) {
        cell.rectProps.fill = 'darkcyan'
      }
      return cell
    })
    if (generator) {
      const generatorIndicator = {
        x: generator.x,
        y: generator.y,
        key: `generator-${ generator.x }-${ generator.y }`,
        rectProps: { ...generatorRectProps },
      }
      returnCells.push(generatorIndicator)
    }
    return [...returnCells]
  }, [generator, graph])

  const handleClickElement = ({ x, y }) => {
    if (generator && generator.x === x && generator.y === y) {
      setGenerator(null)
      return
    }
    setGenerator({ x, y })
  }
  console.log(subgroup)

  return (
    <Stack
      alignItems="flex-start"
      direction="row"
      spacing={ 16 }
      wrap
    >
      <Stack.Item>
        <Resizable
          size={{ width: size, height: size }}
          minWidth={ 250 }
          maxWidth={ 1080 }
          enable={{
            bottomRight: true, right: true, bottom: true,
            top: false, left: false, topRight: false, bottomLeft: false, topLeft: false,
          }}
          onResizeStop={ handleResizeStop }
          lockAspectRatio
          style={{ backgroundColor: '#eee' }}
        >
          <GraphGrid
            key={ size }
            width={ size }
            n={ modulus }
            cells={ cells }
            onClickCell={ handleClickElement }
          />
          <Torus
            n={ modulus }
            width={ size }
            graphNodes={
              graph.map(p => ({
                ...p.torusCoordinates,
                data: { col: p.x, row: p.y },
              }))
            }
            subgroupNodes={
              subgroup.map(p => ({
                ...p.torusCoordinates,
                data: { col: p.x, row: p.y },
              }))
            }
            onClickNode={ handleClickElement }
          />
        </Resizable>
      </Stack.Item>
      <Stack.Item flex="1">
        <Details />
      </Stack.Item>
    </Stack>
  )
}



