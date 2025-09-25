import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { data } from "../data";
import Geometry from "./Geometry";



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
