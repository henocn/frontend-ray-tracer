import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Geometry from "./Geometry";
import Source from "./Source";
import Rays from "./Rays";

const data = {
  "scene": {
    "geometries": [
      {
        "id": "geom1",
        "type": "RingArray",
        "params": {
          "radius": 1,
          "height": 3,
          "position": [0, 0, 0],
          "rotation": [0, 0, 0]
        }
      }
    ]
  },
  "sources": [
    {
      "id": "src1",
      "type": "LargSource",
      "position": [0, 2, -5],
      "direction": [0, 0, 1]
    }
  ],
  "rays": [
    {
      "id": "ray1",
      "points": [
        [0, 2, -5],
        [0, 1, -2],
        [1, 0, 1],
        [2, -1, 3]
      ],
      "color": "#FF9D23"
    },
    {
      "id": "ray2",
      "points": [
        [-3, 0, -5],
        [-2, 0, -2],
        [0, 0, 0],
        [2, 1, 2]
      ],
      "color": "#C14600"
    }
  ]
};


// Scène principale
export default function Scene() {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />

      {/* Géométries */}
      console.log(data);
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
