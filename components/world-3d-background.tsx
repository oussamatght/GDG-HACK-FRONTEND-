"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Stars, Cloud } from "@react-three/drei"
import { Suspense, useRef, useMemo } from "react"
import type * as THREE from "three"

function FloatingParticles({ color, count = 100 }: { color: string; count?: number }) {
  const meshRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 30
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color={color} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function AnimatedRing({ radius, color, speed }: { radius: number; color: string; speed: number }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * speed
      ringRef.current.rotation.z = state.clock.elapsedTime * speed * 0.3
    }
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.5} />
    </mesh>
  )
}

function HellScene() {
  return (
    <>
      <fog attach="fog" args={["#0f0f1a", 5, 30]} />
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 5, 0]} intensity={2} color="#ff4136" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#ff851b" />

      <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
      <FloatingParticles color="#ff4136" count={200} />

      <AnimatedRing radius={8} color="#ff4136" speed={0.1} />
      <AnimatedRing radius={10} color="#ff851b" speed={-0.05} />

      <Environment preset="night" />
    </>
  )
}

function OceanScene() {
  return (
    <>
      <fog attach="fog" args={["#001f3f", 5, 30]} />
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 10, 0]} intensity={1} color="#0074D9" />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#7FDBFF" />

      <Stars radius={50} depth={50} count={1000} factor={3} saturation={0.5} fade speed={0.3} />
      <FloatingParticles color="#0074D9" count={150} />

      <Cloud position={[0, 5, -10]} speed={0.2} opacity={0.3} color="#7FDBFF" />
      <Cloud position={[-5, 3, -15]} speed={0.1} opacity={0.2} color="#0074D9" />

      <AnimatedRing radius={6} color="#0074D9" speed={0.08} />
      <AnimatedRing radius={9} color="#7FDBFF" speed={-0.04} />

      <Environment preset="night" />
    </>
  )
}

function DesertScene() {
  return (
    <>
      <fog attach="fog" args={["#8B4513", 10, 40]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 0]} intensity={2} color="#FFDC00" />
      <pointLight position={[-5, 5, 5]} intensity={1} color="#FF851B" />

      <Stars radius={50} depth={50} count={500} factor={2} saturation={0} fade speed={0.2} />
      <FloatingParticles color="#FFDC00" count={100} />

      <AnimatedRing radius={7} color="#FFDC00" speed={0.06} />
      <AnimatedRing radius={11} color="#FF851B" speed={-0.03} />

      <Environment preset="sunset" />
    </>
  )
}

function NatureScene() {
  return (
    <>
      <fog attach="fog" args={["#0f1a0f", 5, 30]} />
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 10, 0]} intensity={1.5} color="#2ECC40" />
      <pointLight position={[-5, 5, 5]} intensity={0.8} color="#01FF70" />

      <Stars radius={50} depth={50} count={1500} factor={3} saturation={0.3} fade speed={0.4} />
      <FloatingParticles color="#2ECC40" count={180} />

      <Cloud position={[5, 8, -10]} speed={0.15} opacity={0.2} color="#2ECC40" />

      <AnimatedRing radius={5} color="#2ECC40" speed={0.07} />
      <AnimatedRing radius={8} color="#01FF70" speed={-0.035} />

      <Environment preset="forest" />
    </>
  )
}

interface World3DBackgroundProps {
  theme: "hell" | "ocean" | "desert" | "nature"
  className?: string
}

export function World3DBackground({ theme, className }: World3DBackgroundProps) {
  const scenes = {
    hell: HellScene,
    ocean: OceanScene,
    desert: DesertScene,
    nature: NatureScene,
  }

  const Scene = scenes[theme] || HellScene

  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
