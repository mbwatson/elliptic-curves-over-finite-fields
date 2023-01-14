import { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Canvas } from '@react-three/fiber'
import {
  Points, OrbitControls,
} from '@react-three/drei'
import createtorusMesh from '../../util/torus'

//

export const Torus = ({ n, nodes, onClickNode }) => {
  const mesh = useMemo(() => createtorusMesh({
    majorRadius: 2 * n,
    minorRadius: n,
    majorSegments: n,
    minorSegments: n,
  }), [n])

  const handleClickNode = node => () => {
    onClickNode && onClickNode(node)
  }

  return (
    <Fragment>
      <Canvas
        camera={{ position: [0, 2 * n, 0] }}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#fff',
        }}
      >
        <ambientLight />

        { /* base nodes */ }
        <Points>
          {
            mesh.positions.map(({ coordinates }) => {
              const { x, y, z } = coordinates
              return (
                <mesh
                  key={ `base-node-${ x }-${ y }-${ z }` }
                  position={ [x, y, z] }
                >
                  <sphereBufferGeometry args={[1, 15, 15]} attach="geometry" />
                  <meshBasicMaterial color="#f9f9f9" attach="material" />
                </mesh>
              )
            })
          }
        </Points>

        { /* graph nodes */
          Object.keys(nodes).map(key => (
            <Points key={ key }>
              {
                nodes[key].map(({ x, y, torus, color }) => (
                  <Fragment key={ `${ key }--${ JSON.stringify(torus) }` }>
                    <mesh
                      position={ [torus.x, torus.y, torus.z] }
                      onClick={ handleClickNode({ x, y }) }
                    >
                      <sphereBufferGeometry args={[1.1, 15, 15]} attach="geometry" />
                      <meshBasicMaterial color={ color } attach="material" />
                    </mesh>
                  </Fragment>
                ))
              }
            </Points>
          ))
        }

        <OrbitControls />
      </Canvas>
    </Fragment>
  )
}

Torus.propTypes = {
  n: PropTypes.number.isRequired,
  nodes: PropTypes.object.isRequired,
  onClickNode: PropTypes.func,
}
