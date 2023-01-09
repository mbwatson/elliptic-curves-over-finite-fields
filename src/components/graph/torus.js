import { useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { Canvas, /*useFrame*/ } from '@react-three/fiber'
import {
  Point, Points, OrbitControls,
} from '@react-three/drei'
import torus from 'primitive-torus'

const ActualTorus = ({ n }) => {
  const scene = useRef()

  const mesh = useMemo(() => torus({
    majorRadius: 2,
    minorRadius: 1,
    majorSegments: n,
    minorSegments: n,
  }), [n])

  console.log(mesh)
  console.log(mesh.positions.flat(), mesh.cells.flat())

  // useFrame(() => {
  //   scene.current.rotation.y += 0.01
  //   scene.current.rotation.x += 0.01
  //   scene.current.rotation.z += 0.0
  // })

  return (
    <group ref={ scene }>
      <Points size={ 0.1 }>
        {
          mesh.positions.map(([x, y, z]) => (
            <Point
              key={ `point-${ x }-${ y }-${ z }` }
              position={[x, y, z]}
            />
          ))
        }
        <pointsMaterial color="#889" size={ 0.25 } round />
      </Points>
    </group>
  )
}

ActualTorus.propTypes = {
  n: PropTypes.number.isRequired,
}

//

export const Torus = ({ n }) => {
  return (
    <div style={{ height: '600px', border: '1px solid grey' }}>
      <Canvas>
        <ambientLight />
        <pointLight position={ [2, 2, 2] } />
        <ActualTorus n={ n } />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

Torus.propTypes = {
  n: PropTypes.number.isRequired,
}
