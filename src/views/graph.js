import { Fragment, useEffect, useMemo } from 'react'
import { useConfig } from '../context'
import { GraphGrid } from '../components/grid'
import { Torus } from '../components/torus'
import { Drawer, useDrawer } from '../components/drawer'

//

export const GraphView = () => {
  const { generator, setGenerator, graph, modulus, subgroup, graphMode, graphModes } = useConfig()
  const drawer = useDrawer()

  const handleClickPoint = ({ x, y }) => {
    if (generator && generator.x === x && generator.y === y) {
      setGenerator(null)
      return
    }
    setGenerator({ x, y })
  }

  const gridData = useMemo(() => {
    const graphCells = graph
      .map(point => ({
        ...point,
        color: 'lightgrey',
      })).map(node => {
        if (subgroup.some(g => g.x === node.x && g.y === node.y)) {
          if (generator.x === node.x && generator.y === node.y) {
            return {
              ...node,
              color: 'steelblue',
            }
          }
          return {
            ...node,
            color: 'skyblue',
          }
        }
        return node
      })

    return graphCells
  }, [generator, graph, modulus, subgroup])

  const torusData = useMemo(() => {
    const graphNodes = graph
      .map(point => ({ ...point, color: 'grey' }))
    const subgroupNodes = subgroup
      .map(point => {
        if (generator.x === point.x && generator.y === point.y) {
          return {
            ...point,
            color: 'steelblue',
          }
        }
        return ({ ...point, color: 'skyblue' })
      })

    return {
      graph: graphNodes,
      subgroup: subgroupNodes,
    }
  }, [generator, graph, modulus, subgroup])

  useEffect(() => {
    if (generator) {
      drawer.toggle()
    }
  }, [generator])

  return (
    <Fragment>
      {
        graphMode === graphModes.GRID ? (
          <GraphGrid
            n={ modulus }
            cells={ gridData }
            onClickCell={ handleClickPoint }
          />
        ) : (
          <Torus
            n={ modulus }
            nodes={ torusData }
            onClickNode={ handleClickPoint }
          />
        )
      }
      <Drawer />
    </Fragment>
  )
}
