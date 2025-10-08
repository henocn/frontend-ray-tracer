import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Geometry from "./Geometry";
import Source from "./Source";
import Rays from "./Rays";
import { generateRays } from "../utils/generateRays";
import CustomAxes from "../utils/Axes";

export default function Scene({ sceneData }) {
  const geomRefs = useRef([]);
  const [rays, setRays] = useState([]);

  useEffect(() => {
    if (!sceneData) return;
    let mounted = true;

    const tryGenerate = () => {
      const readyCount = geomRefs.current.filter(Boolean).length;
      if (readyCount === sceneData.scene.geometries.length) {
        const generated = generateRays(
          sceneData.source,
          geomRefs.current,
          sceneData.scene.geometries,
          300,
          5000
        );
        if (mounted) setRays(generated);
      } else {
        setTimeout(tryGenerate, 50);
      }
    };

    tryGenerate();
    return () => {
      mounted = false;
    };
  }, [sceneData]);

  return (
    <Canvas
      style={{
        background: "linear-gradient(to bottom, #766e9bff, #141430ff)",
      }}
      camera={{ position: [10, 4, 14], fov: 40 }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 2000, -150000000]} intensity={1} />
      <OrbitControls />
      <CustomAxes size={10} divisions={30} />

      {sceneData.scene.geometries.map((geom, i) => (
        <Geometry
          key={i}
          ref={(el) => (geomRefs.current[i] = el)}
          geom={geom}
        />
      ))}

      <Source src={sceneData.source} />

      <Rays rays={rays} />
    </Canvas>
  );
}
