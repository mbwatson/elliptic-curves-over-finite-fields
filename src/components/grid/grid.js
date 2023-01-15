import PropTypes from 'prop-types'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

//

export const GraphGrid = ({ n, cells, onClickCell }) => {
  const handleClickCell = cell => () => {
    onClickCell && onClickCell(cell)
  }

  return (
    <Canvas
      camera={{ position: [0, n, 0] }}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#fff',
      }}
    >
      <ambientLight />

      <group position={ [(1 - n)/2, 0, (1 - n)/2] }>
        {
          cells.map(({ x, y, color }) => (
            <mesh
              key={ `cell-${ x }-${ y }` }
              rotation={ [-Math.PI / 2, 0, 0] }
              position={ [x, 0, y] }
              color={ color }
              onClick={ handleClickCell({ x, y }) }
            >
              <planeGeometry args={ [1, 1] } />
              <meshStandardMaterial color={ color || 'red' } side={ THREE.DoubleSide } />
            </mesh>
          ))
        }
      </group>
      
      <gridHelper args={ [n, n] } />
      <axesHelper args={ [1] } position={ [-n/2, 0, -n/2] } />

      <mesh position={ [-n/2, 0, -n/2] }>
        <sphereBufferGeometry args={[n / 100, 15, 15]} attach="geometry" />
        <meshBasicMaterial color="red" attach="material" />
      </mesh>

      <OrbitControls />

    </Canvas>
  )
}

GraphGrid.propTypes = {
  n: PropTypes.number.isRequired,
  cells: PropTypes.object.isRequired,
  onClickCell: PropTypes.func,
}
