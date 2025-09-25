

const { radius = 1, height = 2, position = [0, 0, 0], rotation = [0, 0, 0] } = params

const Cylindric = () => {
  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={[radius, radius, height, 32]} />
      <meshStandardMaterial color="#4A90E2" wireframe />
    </mesh>
  )
}

export default Cylindric