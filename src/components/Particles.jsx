import { Points, PointMaterial } from '@react-three/drei'
import { useMemo } from 'react'

export default function Particles() {
  const particles = useMemo(() => {
    const positions = new Float32Array(3000 * 3)

    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 150

      positions[i * 3 + 1] =
        (Math.random() - 0.5) * 150

      positions[i * 3 + 2] =
        (Math.random() - 0.5) * 150
    }

    return positions
  }, [])

  return (
    <Points positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#ffb7e8"
        size={0.18}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}