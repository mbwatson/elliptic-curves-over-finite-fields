import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Canvas } from '@react-three/fiber'
import {
  Point, PointMaterial, Points, OrbitControls,
} from '@react-three/drei'
import createtorusMesh from '../../util/torus'

//

export const Torus = ({ n, width, nodes, onClickNode }) => {
  const mesh = useMemo(() => createtorusMesh({
    majorRadius: 2,
    minorRadius: 1,
    majorSegments: n,
    minorSegments: n,
  }), [n])

  const handleClickNode = node => () => {
    onClickNode && onClickNode(node)
  }

  return (
    <div style={{
      width: `${ width }px`,
      height: `${ width }px`,
      border: '1px solid grey',
    }}>
      <Canvas>
        <ambientLight />
        <pointLight position={ [2, 2, 2] } />
        <Points>
          <PointMaterial size={ 0.5 } color="#eee" />
          {
            mesh.positions.map(({ coordinates }) => {
              const { x, y, z } = coordinates
              return (
                <Point
                  key={ `point-${ x }-${ y }-${ z }` }
                  position={[ x, y, z ]}
                />
              )
            })
          }
        </Points>
        <Points>
          <PointMaterial size={ 0.5 } color="#89a" />
          {
            nodes.map(({ x, y, z, data }) => (
              <Point
                key={ `graph-point-${ x }-${ y }-${ z }` }
                position={[ x, y, z ]}
                onClick={ handleClickNode({ x: data.col, y: data.row }) }
              />
            ))
          }
        </Points>
        <OrbitControls />
      </Canvas>
    </div>
  )
}

Torus.propTypes = {
  n: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  nodes: PropTypes.array.isRequired,
  onClickNode: PropTypes.func,
}
