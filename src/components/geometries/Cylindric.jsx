import { Edges } from "@react-three/drei"

const Cylindric = ({ params }) => {
  const { position, rotation, radius, height } = params

  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={[radius, radius, height, 64, 1]} />
      <meshStandardMaterial
        color="#E67E22"
        metalness={0.3}
        roughness={0.6}
        opacity={0.7}
        transparent={true}
      />
      <Edges color="darkblue" />
    </mesh>
  )
}

export default Cylindric
