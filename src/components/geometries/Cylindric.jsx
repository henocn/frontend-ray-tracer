


const Cylindric = ({ params }) => {

  return (
    <mesh position={params.position} rotation={params.rotation}>
      <cylinderGeometry args={[params.radius, params.radius, params.height, 32]} />
      <meshStandardMaterial color="#4A90E2" wireframe />
    </mesh>
  )
}

export default Cylindric