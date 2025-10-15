import React, { useMemo, forwardRef } from "react";
import * as THREE from "three";

/**
 * Composant pour afficher une surface 3D à partir d'une équation (z = f(x, y))
 * et de boundaries [[x_min, y_min, z_min], [x_max, y_max, z_max]]
 */
const GenericEquationSurface = forwardRef(({ equation, boundaries }, ref) => {
  const geometry = useMemo(() => {
    if (!equation || !boundaries) return null;

    const [min, max] = boundaries;
    const [xMin, yMin] = [min[0], min[1]];
    const [xMax, yMax] = [max[0], max[1]];

    // Nettoyer l'équation (au cas où elle contiendrait "z =")
    const cleanEq = equation.replace("z=", "").trim();

    // Fonction f(x, y)
    let func;
    try {
      func = new Function("x", "y", `return ${cleanEq}`);
    } catch (err) {
      console.error("Erreur dans l’équation :", err);
      return null;
    }

    const segments = 60; // Résolution de la grille
    const dx = (xMax - xMin) / segments;
    const dy = (yMax - yMin) / segments;

    const vertices = [];
    const indices = [];

    // Génération de la grille de points
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j <= segments; j++) {
        const x = xMin + i * dx;
        const y = yMin + j * dy;
        let z = 0;

        try {
          z = func(x, y);
        } catch {
          z = 0;
        }

        vertices.push(x, y, z);
      }
    }

    // Création des faces (triangles)
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const a = i * (segments + 1) + j;
        const b = a + 1;
        const c = a + (segments + 1);
        const d = c + 1;

        // Deux triangles par carré
        indices.push(a, b, d);
        indices.push(a, d, c);
      }
    }

    // Construction de la géométrie
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geom.setIndex(indices);
    geom.computeVertexNormals();

    return geom;
  }, [equation, boundaries]);

  if (!geometry) return null;

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial
        color="#00bcd4"
        wireframe={false}
        metalness={0.3}
        roughness={0.5}
      />
    </mesh>
  );
});

export default GenericEquationSurface;
