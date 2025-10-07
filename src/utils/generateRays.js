import * as THREE from "three";
import { getGeometryBoundaries } from "./boundaries.js";

/**
 * Génère des rayons à partir d'une source vers un ensemble de géométries.
 * @param {Object} source - Définition de la source (position, type, etc.)
 * @param {Array<THREE.Mesh>} meshes - Tableau des maillages à viser.
 * @param {Array<Object>} geometries - Tableau des définitions de géométrie (type, params).
 * @param {number} n - Nombre de rayons à générer.
 * @param {number} maxAttempts - Tentatives maximales avant d'abandonner.
 */
export function generateRays(source, meshes, geometries, n = 10, maxAttempts = 2000) {
  if (!meshes || meshes.length === 0) return [];

  // On calcule les bornes combinées de toutes les géométries
  const combinedBounds = geometries.reduce(
    (acc, geom) => {
      const b = getGeometryBoundaries(geom.type, geom.params);
      acc.xmin = Math.min(acc.xmin, b.xmin);
      acc.xmax = Math.max(acc.xmax, b.xmax);
      acc.ymin = Math.min(acc.ymin, b.ymin);
      acc.ymax = Math.max(acc.ymax, b.ymax);
      acc.zmin = Math.min(acc.zmin, b.zmin);
      acc.zmax = Math.max(acc.zmax, b.zmax);
      return acc;
    },
    {
      xmin: Infinity,
      xmax: -Infinity,
      ymin: Infinity,
      ymax: -Infinity,
      zmin: Infinity,
      zmax: -Infinity,
    }
  );

  const raycaster = new THREE.Raycaster();
  const rays = [];
  let attempts = 0;

  while (rays.length < n && attempts < maxAttempts) {
    attempts++;

    // Génère une cible aléatoire dans la zone englobante de toutes les géométries
    const randTarget = [
      Math.random() * (combinedBounds.xmax - combinedBounds.xmin) + combinedBounds.xmin,
      Math.random() * (combinedBounds.ymax - combinedBounds.ymin) + combinedBounds.ymin,
      Math.random() * (combinedBounds.zmax - combinedBounds.zmin) + combinedBounds.zmin,
    ];

    const origin = new THREE.Vector3(...(source.params.position || [0, 0, 0]));
    const dir = new THREE.Vector3(...randTarget).sub(origin).normalize();
    raycaster.set(origin, dir);

    // Vérifie l’intersection avec n’importe quelle géométrie
    const intersects = raycaster.intersectObjects(meshes, true);

    if (intersects.length > 0) {
      // On prend le point d’intersection le plus proche
      const hit = intersects[0].point.toArray();
      rays.push({
        id: `ray${rays.length + 1}`,
        color: "white",
        points: [origin.toArray(), hit],
      });
    }
  }

  return rays;
}
