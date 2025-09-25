import React from "react"
import { PointLightHelper } from "three"
import { useHelper } from "@react-three/drei"

const PointSource = ({ position = [0, 2, 0], color = "white", intensity = 1, distance = 10 }) => {
  const lightRef = React.useRef()
  useHelper(lightRef, PointLightHelper, 0.5, "yellow")

  return (
    <pointLight
      ref={lightRef}
      position={position}
      color={color}
      intensity={intensity}
      distance={distance}
    />
  )
}

export default PointSource
