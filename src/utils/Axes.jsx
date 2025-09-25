import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";

export default function CustomAxes({ size = 5, divisions = 10 }) {
  const groupRef = useRef();

  useEffect(() => {
    if (!groupRef.current) return;

    // Flèches pour X, Y, Z
    const arrowSize = 0.3;
    const axes = [
      { dir: new THREE.Vector3(1, 0, 0), color: 0xff0000, label: "X" },
      { dir: new THREE.Vector3(0, 1, 0), color: 0x00ff00, label: "Y" },
      { dir: new THREE.Vector3(0, 0, 1), color: 0x0000ff, label: "Z" },
    ];

    axes.forEach(({ dir, color, label }) => {
      const arrow = new THREE.ArrowHelper(
        dir,
        new THREE.Vector3(0, 0, 0),
        size,
        color,
        arrowSize,
        arrowSize * 0.5
      );
      groupRef.current.add(arrow);

      // Labels 3D
      const text = (
        <Text
          key={label}
          position={dir.clone().multiplyScalar(size + 0.5)}
          fontSize={0.4}
          color={new THREE.Color(color)}
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      );
      groupRef.current.add(text);
    });

    // Grille au sol pour la base
    const grid = new THREE.GridHelper(size * 2, divisions, 0x888888, 0x444444);
    groupRef.current.add(grid);
  }, [size, divisions]);

  return <group ref={groupRef} />;
}
