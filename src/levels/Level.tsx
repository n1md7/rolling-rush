export default function Level() {
  return (
    <>
      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color={'#c58a0a'} />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color={'#114dbd'} />
      </mesh>

      <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color={'rgb(182,253,0)'} />
      </mesh>
    </>
  );
}
