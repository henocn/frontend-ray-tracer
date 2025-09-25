import { useMemo } from "react";
import * as THREE from "three";
    

const Ray = ({ ray }) => {
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
};

export default Ray;
