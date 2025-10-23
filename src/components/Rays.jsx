// import React, { useMemo } from "react";
// import * as THREE from "three";

// const Ray = ({ ray }) => {
//   const geometry = useMemo(() => {
//     const points = ray.points.map((p) => new THREE.Vector3(...p));
//     return new THREE.BufferGeometry().setFromPoints(points);
//   }, [ray]);

//   return (
//     <line geometry={geometry}>
//       <lineBasicMaterial color={ray.color || "white"} transparent opacity={0.7} />
//     </line>
//   );
// };

// export default Ray;


import React, { useMemo } from "react";
import * as THREE from "three";

const Rays = ({ rays = [], color = "white", opacity = 0.5 }) => {
  const geometry = useMemo(() => {
    console.log("Rays data received in Rays component:", rays);
    const positions = [];
    rays?.forEach(ray => {
      const [start, end] = ray;
      if (start && end) positions.push(...start, ...end);
    });

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geom;
  }, [rays]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
};

export default Rays;
