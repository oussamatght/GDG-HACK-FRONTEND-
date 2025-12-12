"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Stars, MeshDistortMaterial } from "@react-three/drei"
import { Suspense, useRef } from "react"
import type * as THREE from "three"

function FloatingCodeOrb({
  position,
  color,
  speed = 1,
}: { position: [number, number, number]; color: string; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.2
      meshRef.current.rotation.y += 0.01 * speed
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.5, 1]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

function CodeParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 500

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ff4136" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function RotatingRing({ radius, color, speed }: { radius: number; color: string; speed: number }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * speed
      ringRef.current.rotation.z = state.clock.elapsedTime * speed * 0.5
    }
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.7} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff4136" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0074D9" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#ff4136" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <CodeParticles />

      {/* Floating orbs representing different tech */}
      <FloatingCodeOrb position={[-3, 0, -2]} color="#ff4136" speed={1.2} />
      <FloatingCodeOrb position={[3, -1, -3]} color="#0074D9" speed={0.8} />
      <FloatingCodeOrb position={[2, 2, -2]} color="#FFDC00" speed={1} />
      <FloatingCodeOrb position={[-2, -2, -1]} color="#2ECC40" speed={1.5} />

      {/* Rotating rings around center */}
      <RotatingRing radius={2.5} color="#ff4136" speed={0.3} />
      <RotatingRing radius={3} color="#0074D9" speed={-0.2} />
      <RotatingRing radius={3.5} color="#FFDC00" speed={0.1} />

      <Environment preset="night" />
    </>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff4136" wireframe />
    </mesh>
  )
}

export function Hero3DScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={<LoadingFallback />}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
