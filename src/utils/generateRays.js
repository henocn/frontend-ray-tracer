import {getGeometryBoundaries} from "./boundaries.js" 

export function generateRays(source, geometry, n = 10) {
  const bounds = getGeometryBoundaries(geometry.type, geometry.params)

  return Array.from({ length: n }).map((_, i) => ({
    id: `ray${i + 1}`,
    color: "white",
    points: [
      source.params.position,
      [
        Math.random() * (bounds.xmax - bounds.xmin) + bounds.xmin,
        Math.random() * (bounds.ymax - bounds.ymin) + bounds.ymin,
        Math.random() * (bounds.zmax - bounds.zmin) + bounds.zmin,
      ],
    ],
  }))
}
