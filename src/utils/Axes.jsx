import React from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";

export default function CustomAxes({ size = 5, divisions = 10 }) {
  const arrowSize = 0.3;

  const axes = [
    { dir: [1, 0, 0], color: "red", label: "X" },
    { dir: [0, 1, 0], color: "green", label: "Y" },
    { dir: [0, 0, 1], color: "blue", label: "Z" },
  ];

  return (
    <group>
      {/* Flèches et labels */}
      {axes.map(({ dir, color, label }) => {
        const dirVec = new THREE.Vector3(...dir);
        return (
          <group key={label}>
            {/* Flèche */}
            <arrowHelper
              args={[dirVec, new THREE.Vector3(0, 0, 0), size, color, arrowSize, arrowSize * 0.5]}
            />

            {/* Label */}
            <Text
              position={dirVec.multiplyScalar(size + 0.5).toArray()}
              fontSize={0.4}
              color={color}
              anchorX="center"
              anchorY="middle"
            >
              {label}
            </Text>
          </group>
        );
      })}

      {/* Grille au sol */}
      <gridHelper args={[size * 2, divisions, 0x888888, 0x444444]} />
    </group>
  );
}
