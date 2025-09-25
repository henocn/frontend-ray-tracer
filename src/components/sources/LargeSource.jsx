import React, { useRef } from "react"
import { useHelper } from "@react-three/drei"
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

const LargeSource = ({ params }) => {
  if (!params) return null

  const lightRef = useRef()
  useHelper(lightRef, RectAreaLightHelper, params.color)

  return (
    <rectAreaLight
      ref={lightRef}
      position={params.position}
      rotation={params.rotation}
      color="#FFFFFF"
      width={params.width}
      height={params.height}
    />
  )
}

export default LargeSource
