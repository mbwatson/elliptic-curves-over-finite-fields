import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Canvas, useFrame } from '@react-three/fiber'
import { Grid, Torus as DreiTorus, useTexture, GradientTexture } from '@react-three/drei'
import { useConfig } from '../../context'
import faceImage from './ffffff.jpg'

const ActualTorus = ({ n }) => {
  const scene = useRef()
  const texture = useTexture({
    map: faceImage,
  })

  useFrame(() => {
    scene.current.rotation.y += 0.01
    scene.current.rotation.x += 0.01
    scene.current.rotation.z += 0.0
  })

  return (
    <group>
      <DreiTorus ref={ scene } args={[2, 1, n, n]}>
        <meshBasicMaterial wireframe { ...texture } />
      </DreiTorus>
    </group>
  )
}

ActualTorus.propTypes = {
  n: PropTypes.number.isRequired,
}

//

export const Torus = ({ n }) => {
  return (
    <div style={{ height: '500px', border: '1px solid grey' }}>
      <Canvas>
        <ambientLight />
        <pointLight position={ [2, 2, 2] } />
        <ActualTorus n={ n } />
      </Canvas>
    </div>
  )
}

Torus.propTypes = {
  n: PropTypes.number.isRequired,
}
