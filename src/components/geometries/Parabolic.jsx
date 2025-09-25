import React from "react"
import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry.js"
import { Edges } from "@react-three/drei"

extend({ ParametricGeometry })

const Parabolic = ({ params }) => {
  if (!params) return null

  const {
    f_x = 0.5,
    f_y = 0.5,
    size = 3,
    segments = 15,
    position = [0, 0, 0]
  } = params

  const parabola = (u, v, target) => {
    const x = (u - 0.5) * size
    const y = (v - 0.5) * size
    const z = (x * x) / (4 * f_x) + (y * y) / (4 * f_y)
    target.set(x, y, z)
    console.log(x, y, z)
  }

  return (
    <mesh position={position}>
      <parametricGeometry args={[parabola, segments, segments]} />
      <meshStandardMaterial
        color="#E67E22"
        metalness={0.3}
        roughness={0.6}
        transparent={true}
        opacity={0.8}
        side={THREE.DoubleSide}
      />
      <Edges color="black" />
    </mesh>
  )
}

export default Parabolic
