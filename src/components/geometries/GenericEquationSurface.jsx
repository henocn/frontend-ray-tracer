import React, { useMemo, forwardRef } from "react";
import * as THREE from "three";

/**
 * Surface 3D à partir d'une équation (z = f(x, y))
 * Bornée par `boundaries`, sans bord carré visible.
 */
const GenericEquationSurface = forwardRef(({ equation, boundaries }, ref) => {
    console.log(equation);
  const geometry = useMemo(() => {
    if (!equation || !boundaries) return null;

    const [min, max] = boundaries;
    const [xMin, yMin, zMin] = min;
    const [xMax, yMax, zMax] = max;

    // Nettoyer et préparer l'équation
    const cleanEq = equation.replace(/^z\s*=\s*/i, "").trim();
    let func;
    try {
      func = new Function("x", "y", `return ${cleanEq}`);
    } catch (err) {
      console.error("Erreur d’équation :", err);
      return null;
    }

    const segments = 1000;
    const dx = (xMax - xMin) / segments;
    const dy = (yMax - yMin) / segments;

    const vertices = [];
    const indices = [];
    const zValues = [];

    // --- Génération des sommets
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j <= segments; j++) {
        const x = xMin + i * dx;
        const y = yMin + j * dy;
        let z;
        try {
          z = func(x, y);
        } catch {
          z = zMin;
        }
        // Clamp pour rester dans les bornes verticales
        z = Math.max(zMin, Math.min(z, zMax));

        vertices.push(x, y, z);
        zValues.push(z);
      }
    }

    // --- Génération des faces (évite les bords plats)
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const a = i * (segments + 1) + j;
        const b = a + 1;
        const c = a + (segments + 1);
        const d = c + 1;

        const zA = zValues[a];
        const zB = zValues[b];
        const zC = zValues[c];
        const zD = zValues[d];

        // Ignore les faces trop plates (rebords)
        const avg = (zA + zB + zC + zD) / 4;
        const minZ = Math.min(zA, zB, zC, zD);
        const delta = Math.abs(avg - minZ);

        // Supprime les triangles presque plats
        if (delta > 0.001) {
          indices.push(a, b, d);
          indices.push(a, d, c);
        }
      }
    }

    // --- Construction de la géométrie
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();

    return geom;
  }, [equation, boundaries]);

  if (!geometry) return null;

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial
        color="#E67E22"
        roughness={0.5}
        metalness={0.3}
        side={THREE.DoubleSide}
        wireframe={false}
        transparent
        opacity={1}
      />
    </mesh>
  );
});

export default GenericEquationSurface;
