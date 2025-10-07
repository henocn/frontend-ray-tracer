
import * as THREE from "three"
import { getGeometryBoundaries } from "./boundaries.js"

/**
 * Sample a random point on the surface of a geometry (world coords)
 */
function samplePointOnSurface(geom) {
  const type = geom.type
  const p = geom.params || {}

  if (type === "Parabolic") {
    const f_x = p.f_x || 0.5
    const f_y = p.f_y || 0.5
    const size = p.size || 3
    const [px, py, pz] = p.position || [0, 0, 0]

    const x_local = (Math.random() - 0.5) * size
    const y_local = (Math.random() - 0.5) * size
    const z_local = (x_local * x_local) / (4 * f_x) + (y_local * y_local) / (4 * f_y)

    return [px + x_local, py + y_local, pz + z_local]
  }

  if (type === "Cylindric") {
    const radius = p.radius ?? p.size / 2 ?? 1
    const height = p.height ?? 1
    const [px, py, pz] = p.position || [0, 0, 0]

    const angle = Math.random() * Math.PI * 2
    const x = px + radius * Math.cos(angle)
    const y = py + radius * Math.sin(angle)
    const z = pz + (Math.random() - 0.5) * height

    return [x, y, z]
  }

  if (type === "RingArray") {
    const radius = p.radius || 3
    const count = p.count || p.elementsCount || 8
    const [px, py, pz] = p.position || [0, 0, 0]

    const idx = Math.floor(Math.random() * count)
    const angle = (idx / count) * Math.PI * 2
    return [px + radius * Math.cos(angle), py + radius * Math.sin(angle), pz]
  }

  // fallback: uniform random in bounding box
  const b = getGeometryBoundaries(type, p)
  return [
    Math.random() * (b.xmax - b.xmin) + b.xmin,
    Math.random() * (b.ymax - b.ymin) + b.ymin,
    Math.random() * (b.zmax - b.zmin) + b.zmin,
  ]
}

/**
 * Generate rays that hit your meshes.
 * @param {Object} source - { params: { position: [x,y,z] } }
 * @param {Array<THREE.Object3D>} meshes - refs from R3F
 * @param {Array<Object>} geometries - {type, params} array
 * @param {number} n - desired number of rays
 * @param {number} maxAttempts - max tries
 * @param {boolean} debug - console.debug logs
 */
export function generateRays(source, meshes, geometries, n = 10, maxAttempts = 2000) {
  if (!meshes?.length) {
    if (debug) console.warn("[generateRays] No meshes provided")
    return []
  }

  const raycaster = new THREE.Raycaster()
  const rays = []
  let attempts = 0

  const origin = new THREE.Vector3(...(source?.params?.position || [0, 0, 0]))

  // mesh + geometry pairs
  const pairs = geometries.map((g, i) => ({ geom: g, mesh: meshes[i] })).filter(x => x.mesh)
  if (pairs.length === 0) {
    if (debug) console.warn("[generateRays] No valid mesh/geometry pairs")
    return []
  }

  while (rays.length < n && attempts < maxAttempts) {
    attempts++
    const pair = pairs[Math.floor(Math.random() * pairs.length)]
    const { geom, mesh } = pair
    if (!mesh) continue

    const sampled = samplePointOnSurface(geom)
    const target = new THREE.Vector3(...sampled)
    const dir = new THREE.Vector3().subVectors(target, origin).normalize()
    raycaster.set(origin, dir)

    // check intersection with the mesh
    const intersects = mesh ? raycaster.intersectObject(mesh, true) : []

    if (intersects.length > 0) {
      const hit = intersects[0].point.toArray()
      rays.push({
        id: `ray${rays.length + 1}`,
        color: "#FFFFFF",
        points: [origin.toArray(), hit],
      })
    }
  }

  if (debug) console.debug(`[generateRays] finished: attempts=${attempts}, rays=${rays.length}/${n}`)
  return rays
}
