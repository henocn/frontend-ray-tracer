import React, { forwardRef, useMemo } from "react"
import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry.js"
import { Edges } from "@react-three/drei"
import { compile } from "mathjs"

extend({ ParametricGeometry })

const Parabolic = forwardRef(({ params = {}, equation, boundaries }, ref) => {
  // params fallback
  const {
    f_x = 0.5,
    f_y = 0.5,
    size = 3,
    segments = 300,
    position = [0, 0, 0],
    color = "#E67E22",
    opacity = 1,
  } = params || {}

  // boundaries: [[x_min,x_max],[y_min,y_max],[z_min,z_max]]
  const xMin = boundaries?.[0]?.[0] ?? -size / 2
  const xMax = boundaries?.[0]?.[1] ?? size / 2
  const yMin = boundaries?.[1]?.[0] ?? -size / 2
  const yMax = boundaries?.[1]?.[1] ?? size / 2
  const zMin = boundaries?.[2]?.[0]
  const zMax = boundaries?.[2]?.[1]

  // prepare evaluator
  const expr = useMemo(() => {
    if (!equation || typeof equation !== "string") return null
    const clean = equation.replace(/^[zZ]\s*=\s*/, "")
    try {
      return compile(clean)
    } catch (e) {
      console.warn("Parabolic: cannot compile equation", e)
      return null
    }
  }, [equation])

  // parametric function
  const surfaceFn = useMemo(() => {
    return (u, v, target) => {
      // map u,v [0,1] to x,y in boundaries
      const x = xMin + u * (xMax - xMin)
      const y = yMin + v * (yMax - yMin)

      let z = 0
      if (expr) {
        try {
          // evaluate with available parameters: x,y,f_x,f_y
          const scope = { x, y, f_x, f_y }
          const value = expr.evaluate(scope)
          // mathjs may return complex or array; ensure number
          z = Number(value)
          if (!Number.isFinite(z)) {
            z = (x * x) / (4 * f_x) + (y * y) / (4 * f_y)
          }
        } catch (err) {
          // fallback to parabolic formula
          console.warn('Parabolic: error evaluating expression', err)
          z = (x * x) / (4 * f_x) + (y * y) / (4 * f_y)
        }
      } else {
        z = (x * x) / (4 * f_x) + (y * y) / (4 * f_y)
      }

      // clamp with z boundaries if provided
      if (typeof zMin === "number") z = Math.max(z, zMin)
      if (typeof zMax === "number") z = Math.min(z, zMax)

      target.set(x, y, z)
    }
  }, [xMin, xMax, yMin, yMax, expr, f_x, f_y, zMin, zMax])

  return (
    <mesh ref={ref} position={position}>
      <parametricGeometry args={[surfaceFn, Math.max(2, segments), Math.max(2, segments)]} />
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.6}
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
      />
      <Edges color="black" />
    </mesh>
  )
})

export default Parabolic
