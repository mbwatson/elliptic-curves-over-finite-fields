import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Canvas, useFrame } from '@react-three/fiber'
import torus from 'primitive-torus'
import { useConfig } from '../../context'

const mesh = torus({
  majorRadius: 1,
  minorRadius: 0.4,
  majorSegments: 12,
  minorSegments: 48,
})

console.log(mesh)

const ActualTorus = ({ majorSegments, minorSegments, ...props }) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh { ...props } ref={ ref } scale={ 1 }>
      <torusGeometry args={ [
        1, // radius - Radius of the torus, from center of the torus to the center of the tube. Default is 1.
        0.4, // tube — Radius of the tube. Default is 0.4.
        majorSegments, // radialSegments — Default is 12
        minorSegments, // tubularSegments — Default is 48.
        Math.PI * 2, //arc
      ] } />
      <meshStandardMaterial color="darkcyan" wireframe />
    </mesh>
  )
}

ActualTorus.propTypes = {
  majorSegments: PropTypes.number.isRequired,
  minorSegments: PropTypes.number.isRequired,
}

//
export const Torus = ({ majorSegments, minorSegments }) => {
  return (
    <div style={{ height: '500px', border: '1px solid grey' }}>
      <Canvas>
        <ambientLight />
        <pointLight position={ [0, 10, 10] } />
        <ActualTorus position={ [-1.2, 0, 0] } majorSegments={ majorSegments } minorSegments={ minorSegments } />
      </Canvas>
    </div>
  )
}

Torus.propTypes = {
  majorSegments: PropTypes.number.isRequired,
  minorSegments: PropTypes.number.isRequired,
}
