import React, { useRef } from "react"
import { useHelper } from "@react-three/drei"
import { PointLightHelper } from "three"

const PointSource = ({ params }) => {
  const lightRef = useRef()
  const helperSize = params?.helperSize || 0.5
  const helperColor = params?.color || "#FFFFFF"
  useHelper(lightRef, PointLightHelper, helperSize, helperColor)

  if (!params) return null

  return (
    <pointLight
      ref={lightRef}
      position={params.position}
      color={helperColor}
    />
  )
}

export default PointSource
