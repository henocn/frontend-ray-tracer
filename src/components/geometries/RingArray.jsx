import React from 'react'

const { radius = 3, count = 8, elementSize = 0.2, position = [0, 0, 0] } = params
const angleStep = (2 * Math.PI) / count
const RingArray = ({ params }) => {
  return (
    <group position={position}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = i * angleStep
        const x = radius * Math.cos(angle)
        const y = radius * Math.sin(angle)
        return (
          <mesh key={i} position={[x, y, 0]}>
            <sphereGeometry args={[elementSize, 16, 16]} />
            <meshStandardMaterial color="#2ECC71" />
          </mesh>
        )
      })}
    </group>
  )
}

export default RingArray;