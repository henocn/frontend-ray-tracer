import React, { useState, useMemo } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

function Surface({ equation }) {
  const mesh = useMemo(() => {
    let expr = equation.trim()
    if (expr.startsWith("z")) expr = expr.split("=")[1] || "0"

    let f
    try {
      f = new Function("x", "y", `return ${expr}`)
    } catch (e) {
      console.error("Equation invalide:", e)
      f = () => 0
    }

    const size = 4
    const segments = 100
    const geometry = new THREE.PlaneGeometry(size, size, segments, segments)
    const pos = geometry.attributes.position

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i) - size / 2
      const y = pos.getY(i) - size / 2
      let z
      try {
        z = f(x, y)
      } catch {
        z = 0
      }
      pos.setZ(i, z)
    }
    pos.needsUpdate = true
    geometry.computeVertexNormals()
    return geometry
  }, [equation])

  return (
    <mesh geometry={mesh}>
      <meshStandardMaterial
        color="#ff9d23"
        roughness={0.4}
        metalness={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default function Test() {
  const [equation, setEquation] = useState("z = x*x - y*y")

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: "linear-gradient(to bottom, #1a1632, #0a0615)",
      }}
    >
      <div style={{ width: "250px", padding: "1rem", color: "white" }}>
        <h3>Équation de la surface</h3>
        <input
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          style={{
            width: "100%",
            padding: "6px",
            borderRadius: "6px",
            border: "none",
            marginTop: "8px",
            background: "#222",
            color: "#fff",
          }}
        />
        <p style={{ fontSize: "0.85rem", marginTop: "10px" }}>
          Exemples :
          <br />z = x*x + y*y
          <br />z = Math.sin(x*y)
          <br />z = Math.cos(x) * Math.sin(y)
          <br />z = x*x - y*y
        </p>
      </div>

      <Canvas camera={{ position: [3, 2, 3], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} />
        <OrbitControls />
        <axesHelper args={[3]} />
        <Surface equation={equation} />
      </Canvas>
    </div>
  )
}
