import React, { useMemo } from "react";
import * as THREE from "three";

const Ray = ({ ray }) => {
  const geometry = useMemo(() => {
    const points = ray.points.map((p) => new THREE.Vector3(...p));
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [ray]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={ray.color || "red"} transparent opacity={0.7} />
    </line>
  );
};

export default Ray;
