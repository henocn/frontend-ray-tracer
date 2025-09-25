import { Edges } from "@react-three/drei"

const Cylindric = ({ params }) => {
  const { position, rotation, radius, height } = params

  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={[radius, radius, height, 64, 1]} />
      <meshStandardMaterial
        color="#4A90E2"
        metalness={0.3}
        roughness={0.6}
      />
      <Edges color="darkblue" />
    </mesh>
  )
}

export default Cylindric
