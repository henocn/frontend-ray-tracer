import React, { forwardRef } from "react"
import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry.js"
import { Edges } from "@react-three/drei"

extend({ ParametricGeometry }) // doit être exécuté avant le rendu

const Parabolic = forwardRef(({ params }, ref) => {
  if (!params) return null

  const {
    f_x = 0.5,
    f_y = 0.5,
    size = 3,
    segments = 32,
    position = [0, 0, 0],
    color = "#E67E22",
    opacity = 0.8,
  } = params

  const parabola = (u, v, target) => {
    const x = (u - 0.5) * size
    const y = (v - 0.5) * size
    const z = (x * x) / (4 * f_x) + (y * y) / (4 * f_y)
    target.set(x, y, z)
  }

  return (
    <mesh ref={ref} position={position}>
      <parametricGeometry args={[parabola, segments, segments]} />
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.6}
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
      />
      <Edges color="black" />
    </mesh>
  )
})

export default Parabolic
