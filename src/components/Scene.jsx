import React, { useRef, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Geometry from "./Geometry"
import Source from "./Source"
import Ray from "./Ray"
import { generateRays } from "../utils/generateRays"

const data = {
  scene: {
    geometry: {
      type: "Cylindric",
      params: {
        size: 4,
        height: 2,
        position: [0, 0, 0],
      },
      // type: "Parabolic",
      // params: {
      //   f_x: 0.5,
      //   f_y: 0.8,
      //   size: 3,
      //   position: [0, 0, 0],
      // },
    },
  },
  source: {
    // type: "Large",
    // params: {
    //   position: [0, 2, -150000000],
    //   width: 1,
    //   height: 1,
    //   intensity: 1,
    // },
    type: "Point",
    params: {
      position: [0, 2, -150000000],
      intensity: 1,
    },
  },
}

export default function Scene() {
  const geomRef = useRef(null)
  const [rays, setRays] = useState([])

  useEffect(() => {
    let mounted = true
    const tryGenerate = () => {
      if (geomRef.current) {
        const generated = generateRays(data.source, geomRef.current, data.scene.geometry, 100)
        if (mounted) setRays(generated)
      } else {
        setTimeout(tryGenerate, 50)
      }
    }
    tryGenerate()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <Canvas camera={{ position: [8, 2, 12], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 2, -150000000]} intensity={1} />
      <OrbitControls />
      <axesHelper args={[5]} />

      <Geometry ref={geomRef} geom={data.scene.geometry} />
      <Source src={data.source} />
      {rays.map((r) => (
        <Ray key={r.id} ray={r} />
      ))}
    </Canvas>
  )
}
