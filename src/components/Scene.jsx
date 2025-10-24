import React, { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Geometry from "./Geometry";
import Source from "./Source";
import Rays from "./Rays";
import CustomAxes from "../utils/Axes";



export default function Scene({ sceneData = {} }) {
  const geomRefs = useRef([]);
  function ZUpSetter() {
    const { scene, camera } = useThree();
    useEffect(() => {
      if (scene && camera) {
        scene.up.set(0, 0, 1);
        camera.up.set(0, 0, 1);
        if (typeof camera.updateProjectionMatrix === "function") camera.updateProjectionMatrix();
      }
    }, [scene, camera]);
    return null;
  }

  // Support both old shape (sceneData.scene.geometries) and new shape (sceneData.geometries)
  const geometries = (sceneData?.scene?.geometries) || sceneData?.geometries || [];
  const source = sceneData?.source || sceneData?.src || { params: { position: [0, 0, 0] } };
  const rays = sceneData?.rays || [];

  return (
    <Canvas
      style={{
        background: "linear-gradient(to bottom, #766e9bff, #141430ff)",
      }}
      camera={{ position: [10, 4, 14], fov: 40 }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={source.params.position ||[0, 30000000, -150000000]} intensity={1} />
      <OrbitControls />
      <CustomAxes size={30} divisions={30} />

      {Array.isArray(geometries) &&
        geometries.map((geom, i) => (
          <Geometry key={i} ref={(el) => (geomRefs.current[i] = el)} geom={geom} />
        ))}

      <Source src={source} />
      {Array.isArray(rays) && <Rays rays={rays} />}
    </Canvas>
  );
}
