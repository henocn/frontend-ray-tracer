import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Geometry from "./Geometry";
import Source from "./Source";
import Ray from "./Ray";
import { generateRays } from "../utils/generateRays";
import CustomAxes from "../utils/Axes";

const data = {
  scene: {
    geometries: [
      {
        type: "Parabolic",
        params: {
          f_x: 0.5,
          f_y: 0.8,
          size: 3,
          position: [0, 1.4, 0],
        },
      },
      {
        type: "Cylindric",
        params: {
          size: 2,
          height: 1.5,
          position: [4, 1, 2],
        },
      },
      {
        type: "Cylindric",
        params: {
          size: 1.2,
          height: 1.8,
          position: [-3, 1, -1],
        },
      },
    ],
  },
  source: {
    type: "Point",
    params: {
      position: [0, 3, -150000000],
      intensity: 1,
    },
  },
};

export default function Scene() {
  const geomRefs = useRef([]);
  const [rays, setRays] = useState([]);

  useEffect(() => {
    let mounted = true;

    const tryGenerate = () => {
      const allReady = geomRefs.current.every((g) => g);
      if (allReady) {
        const generated = generateRays(
          data.source,
          geomRefs.current,
          data.scene.geometries,
          1000 // nombre de rayons
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
  }, []);

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

      {data.scene.geometries.map((geom, i) => (
        <Geometry
          key={i}
          ref={(el) => (geomRefs.current[i] = el)}
          geom={geom}
        />
      ))}

      <Source src={data.source} />

      {rays.map((r) => (
        <Ray key={r.id} ray={r} />
      ))}
    </Canvas>
  );
}
