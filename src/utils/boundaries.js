
export function getGeometryBoundaries(type, params) {
  switch (type) {
    case "Parabolic": {
      const { f_x = 0.5, f_y = 0.8, size = 3, position = [0, 0, 0] } = params

      const half = size / 2
      const [px, py, pz] = position

      // X et Y bornés par la taille
      const xmin = px - half
      const xmax = px + half
      const ymin = py - half
      const ymax = py + half

      // Z varie en fonction de l’équation du paraboloïde
      const z1 = (xmin * xmin) / (4 * f_x) + (ymin * ymin) / (4 * f_y)
      const z2 = (xmax * xmax) / (4 * f_x) + (ymin * ymin) / (4 * f_y)
      const z3 = (xmin * xmin) / (4 * f_x) + (ymax * ymax) / (4 * f_y)
      const z4 = (xmax * xmax) / (4 * f_x) + (ymax * ymax) / (4 * f_y)

      const zmax = Math.max(z1, z2, z3, z4) + pz
      const zmin = pz // bas de la parabole au centre

      return { xmin, xmax, ymin, ymax, zmin, zmax }
    }

    // Tu pourras ajouter d’autres types (Sphere, Cube, etc.)
    default:
      throw new Error(`Unsupported geometry type: ${type}`)
  }
}
