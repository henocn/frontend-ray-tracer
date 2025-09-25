import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import data from "../data.json";
import Geometry from "./Geometry";
import Source from "./Source";
import Ray from "./Ray";




// Scène principale
export default function Scene() {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />

      {/* Géométries */}
      {data.scene.geometries.map((g) => (
        <Geometry key={g.id} geom={g} />
      ))}

      {/* Sources */}
      {data.sources.map((s) => (
        <Source key={s.id} src={s} />
      ))}

      {/* Rayons */}
      {data.rays.map((r) => (
        <Ray key={r.id} ray={r} />
      ))}
    </Canvas>
  );
}
