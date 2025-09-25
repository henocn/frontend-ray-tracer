import React, { useRef } from "react"
import { useHelper } from "@react-three/drei"
import { PointLightHelper } from "three"

const PointSource = ({ params }) => {
  if (!params) return null

  const lightRef = useRef()
  useHelper(lightRef, PointLightHelper, params.helperSize || 0.5, params.color)

  return (
    <pointLight
      ref={lightRef}
      position={params.position}
      color="#FFFFFF"
    />
  )
}

export default PointSource
