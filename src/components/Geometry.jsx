import React, { forwardRef } from "react"
import Cylindric from "./geometries/Cylindric"
import Parabolic from "./geometries/Parabolic"
import RingArray from "./geometries/RingArray"

const Geometry = forwardRef(({ geom }, ref) => {
  if (!geom) return null
  switch (geom.type) {
    case "Cylindric":
      return <Cylindric ref={ref} params={geom.params} />
    case "Parabolic":
      return <Parabolic ref={ref} params={geom.params} />
    case "RingArray":
      return <RingArray ref={ref} params={geom.params} />
    default:
      return null
  }
})

export default Geometry
