import React, { forwardRef } from "react"
import { Edges } from "@react-three/drei"

const RingArray = forwardRef(({ params }, ref) => {
  if (!params) return null
  const {
    radius = 3,
    count = 8,
    elementSize = 0.2,
    position = [0, 0, 0],
    color = "#2ECC71",
  } = params

  const angleStep = (2 * Math.PI) / count

  return (
    <group ref={ref} position={position}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = i * angleStep
        const x = radius * Math.cos(angle)
        const y = radius * Math.sin(angle)
        return (
          <mesh key={i} position={[x, y, 0]}>
            <sphereGeometry args={[elementSize, 16, 16]} />
            <meshStandardMaterial color={color} />
            {/* edges optionnel pour chaque élément */}
          </mesh>
        )
      })}
    </group>
  )
})

export default RingArray
