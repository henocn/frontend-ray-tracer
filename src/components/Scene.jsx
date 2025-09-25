import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Cylindric, Parabolic, RingArray } from "./Geometry";

// Exemple de données reçues du backend
const data = {
  scene: {
    geometries: [
      {
        id: "geom1",
        type: "RingArray",
        params: {
          radius: 1,
          height: 3,
          position: [0, 0, 0],
          rotation: [0, 0, 0],
        },
      },
    ],
  },
  sources: [
    {
      id: "src1",
      type: "LargSource",
      position: [0, 2, -5],
      direction: [0, 0, 1],
    },
  ],
  rays: [
    {
      id: "ray1",
      points: [
        [0, 2, -5],
        [0, 1, -2],
        [1, 0, 1],
        [2, -1, 3],
      ],
      color: "#FF9D23",
    },
    {
      id: "ray2",
      points: [
        [-3, 0, -5],
        [-2, 0, -2],
        [0, 0, 0],
        [2, 1, 2],
      ],
      color: "#C14600",
    },
  ],
};

// Composant pour afficher les géométries


// Composant pour afficher une source lumineuse
function Source({ src }) {
  return (
    <mesh position={src.position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="yellow" emissive="orange" />
    </mesh>
  );
}

// Composant pour afficher un rayon
function Ray({ ray }) {
  const points = useMemo(
    () => ray.points.map((p) => new THREE.Vector3(...p)),
    [ray]
  );

  return (
    <line>
      <bufferGeometry attach="geometry" setFromPoints={points} />
      <lineBasicMaterial color={ray.color || "red"} />
    </line>
  );
}

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
