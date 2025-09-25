import * as THREE from "three"
import { getGeometryBoundaries } from "./boundaries.js"

export function generateRays(source, mesh, geometry, n = 10, maxAttempts = 2000) {
  if (!mesh) return []
  const bounds = getGeometryBoundaries(geometry.type, geometry.params)
  const raycaster = new THREE.Raycaster()
  const rays = []
  let attempts = 0

  while (rays.length < n && attempts < maxAttempts) {
    attempts++
    const randTarget = [
      Math.random() * (bounds.xmax - bounds.xmin) + bounds.xmin,
      Math.random() * (bounds.ymax - bounds.ymin) + bounds.ymin,
      Math.random() * (bounds.zmax - bounds.zmin) + bounds.zmin,
    ]

    const origin = new THREE.Vector3(...(source.params.position || [0, 0, 0]))
    const dir = new THREE.Vector3(...randTarget).sub(origin).normalize()
    raycaster.set(origin, dir)

    const intersects = raycaster.intersectObject(mesh, true)
    if (intersects.length > 0) {
      const hit = intersects[0].point.toArray()
      rays.push({
        id: `ray${rays.length + 1}`,
        color: "white",
        points: [origin.toArray(), hit],
      })
    }
  }

  return rays
}
