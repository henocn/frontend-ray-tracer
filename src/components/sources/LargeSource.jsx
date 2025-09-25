import React from "react"

const LargeSource = ({ params }) => {
  if (!params) return null

  const {
    position,
    color = "#FFFFFF",
    intensity = 1,
    radius = 0.5
  } = params

  return (
    <mesh position={position}>
      <circleGeometry args={[radius, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={intensity}
      />
    </mesh>
  )
}

export default LargeSource
