
const Parabolic = ({params}) => {
  const { focal = 2, size = 3, segments = 32 } = params;

  const parabola = (u, v, target) => {
    const x = (u - 0.5) * size;
    const y = (v - 0.5) * size;
    const z = (x * x + y * y) / (4 * focal);
    target.set(x, y, z);
  };

  return (
    <mesh position={params.position}>
      <parametricGeometry args={[parabola, segments, segments]} />
      <meshStandardMaterial color="#E67E22" wireframe />
    </mesh>
  );
};

export default Parabolic;
