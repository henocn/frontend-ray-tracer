import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Geometry from "./Geometry";
import Source from "./Source";
import Rays from "./Rays";
import CustomAxes from "../utils/Axes";



export default function Scene({ sceneData }) {
  const geomRefs = useRef([]);

  return (
    <Canvas
      style={{
        background: "linear-gradient(to bottom, #766e9bff, #141430ff)",
      }}
      camera={{ position: [10, 4, 14], fov: 40 }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={sceneData.source.params.position || [0, 30000000, -150000000]} intensity={1} />
      <OrbitControls />
      <CustomAxes size={30} divisions={30} />

      {sceneData.scene.geometries.map((geom, i) => (
        <Geometry
          key={i}
          ref={(el) => (geomRefs.current[i] = el)}
          geom={geom}
        />
      ))}

      <Source src={sceneData.source} />
      {console.log(sceneData.rays)}
      <Rays rays={sceneData.rays} />
    </Canvas>
  );
}
