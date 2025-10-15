import * as THREE from "three"
import { getGeometryBoundaries } from "./boundaries.js"

/**
 * Sample a random point on the surface of a geometry (world coords)
 */
function samplePointOnSurface(geom) {
  const type = geom.type
  const p = geom.params || {}
  const boundaries = geom.boundaries || {}

  // récupérer les bornes
  const b = getGeometryBoundaries(type, p, boundaries)

  if (type === "Parabolic") {
    const x_local = Math.random() * (b.xmax - b.xmin) + b.xmin
    const y_local = Math.random() * (b.ymax - b.ymin) + b.ymin
    const z_local = (x_local * x_local) / (4 * (p.f_x || 0.5)) + (y_local * y_local) / (4 * (p.f_y || 0.5))
    return [x_local, y_local, b.zmin + z_local]
  }

  if (type === "Cylindric") {
    const x_local = Math.random() * (b.xmax - b.xmin) + b.xmin
    const y_local = Math.random() * (b.ymax - b.ymin) + b.ymin
    const z_local = Math.random() * (b.zmax - b.zmin) + b.zmin
    return [x_local, y_local, z_local]
  }

  if (type === "RingArray") {
    const angle = Math.random() * 2 * Math.PI
    const r = p.radius || 3
    const [px, py, pz] = p.position || [0, 0, 0]
    return [px + r * Math.cos(angle), py + r * Math.sin(angle), pz]
  }

  // fallback
  return [
    Math.random() * (b.xmax - b.xmin) + b.xmin,
    Math.random() * (b.ymax - b.ymin) + b.ymin,
    Math.random() * (b.zmax - b.zmin) + b.zmin,
  ]
}


/**
 * Generate rays roughly equally distributed among geometries
 */
export function generateRays(source, meshes, geometries, n = 10, maxAttempts = 2000) {
  if (!meshes?.length || !geometries?.length) return []

  const rays = []
  const raycaster = new THREE.Raycaster()
  const origin = new THREE.Vector3(...(source?.params?.position || [0, 0, 0]))

  // mesh+geometry pairs
  const pairs = geometries.map((g, i) => ({ geom: g, mesh: meshes[i] })).filter(x => x.mesh)
  if (!pairs.length) return []

  // répartir n rayons équitablement
  const nPerGeom = Math.ceil(n / pairs.length)

  pairs.forEach(({ geom, mesh }, idx) => {
    let attempts = 0
    let generated = 0

    while (generated < nPerGeom && attempts < maxAttempts) {
      attempts++
      const sampled = samplePointOnSurface(geom)
      const target = new THREE.Vector3(...sampled)
      const dir = new THREE.Vector3().subVectors(target, origin).normalize()
      raycaster.set(origin, dir)

      const intersects = mesh ? raycaster.intersectObject(mesh, true) : []
      if (intersects.length > 0) {
        const hit = intersects[0].point.toArray()
        rays.push({
          id: `ray${rays.length + 1}`,
          points: [origin.toArray(), hit],
        })
        generated++
      }
    }
  })

  return rays
}
