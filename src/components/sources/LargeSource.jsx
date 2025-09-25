import React from "react"

const LargeSource = ({
  position = [0, 2, 0],
  rotation = [-Math.PI / 2, 0, 0],
  color = "white",
  intensity = 1,
  width = 5,
  height = 5
}) => {
  return (
    <rectAreaLight
      position={position}
      rotation={rotation}
      color={color}
      intensity={intensity}
      width={width}
      height={height}
    />
  )
}

export default LargeSource
