import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Geometry from "./Geometry";
import Source from "./Source";
import Ray from "./Ray";

const data = {
  scene: {
    geometry: {
      type: "Cylindric",
      params: {
        radius: 1,
        height: 3,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
    },
  },
  // source: {
  //   type: "Point",
  //   params: {
  //     position: [0, 2, -500],
  //   },
  // },
  source: {
    type: "Large",
    params: {
      position: [0, 2, -20],
      width: 2,
      height: 2,
      color: "#FFFFFF",
      intensity: 1,
    },
  },
  rays: [
    {
      id: "ray1",
      points: [
        [0, 2, -5],
        [0, 1, -2],
        [1, 0, 1],
        [2, -1, 3],
      ],
    },
    {
      id: "ray2",
      points: [
        [-3, 0, -5],
        [-2, 0, -2],
        [0, 0, 0],
        [2, 1, 2],
      ],
    },
  ],
};

// Scène principale
export default function Scene() {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <OrbitControls />
      {/* Géométries */}
      <Geometry geom={data.scene.geometry} />
      <Source src={data.source} />

      {/* Rayons */}
      {data.rays.map((r) => (
        <Ray key={r.id} ray={r} />
      ))}
    </Canvas>
  );
}
