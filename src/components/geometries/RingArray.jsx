import React from 'react'

const RingArray = ({ params }) => {
  const angleStep = (2 * Math.PI) / params.count

  return (
    <group position={params.position}>
      {Array.from({ length: params.count }).map((_, i) => {
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