import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export default function CursorZoom() {
  const { camera, gl, controls, scene } = useThree();

  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const zoomSpeed = 0.0015;

    const onWheel = (event) => {
      event.preventDefault();

      // Récupère la position de la souris dans le canvas
      const rect = gl.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Plan virtuel de référence
      const plane = new THREE.Plane();
      plane.setFromNormalAndCoplanarPoint(
        camera.getWorldDirection(new THREE.Vector3()).negate(),
        controls.target.clone()
      );

      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersection);

      if (!intersection) return;

      const direction = new THREE.Vector3()
        .subVectors(intersection, camera.position)
        .normalize();

      const delta = event.deltaY * zoomSpeed;

      camera.position.addScaledVector(direction, delta);
      controls.target.addScaledVector(direction, delta);

      controls.update();
    };

    gl.domElement.addEventListener("wheel", onWheel, { passive: false });

    return () => gl.domElement.removeEventListener("wheel", onWheel);
  }, [camera, gl, controls, scene]);

  return null;
}
