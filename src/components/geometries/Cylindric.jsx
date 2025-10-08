import React, { forwardRef } from "react"
import * as THREE from "three"
import { Edges } from "@react-three/drei"

const Cylindric = forwardRef(({ params }, ref) => {
  if (!params) return null
  const {
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    radius = 1,
    height = 2,
    radialSegments = 64,
    color = "#E67E22",
    opacity = 1,
  } = params

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <cylinderGeometry args={[radius, radius, height, radialSegments, 1]} />
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

export default Cylindric
