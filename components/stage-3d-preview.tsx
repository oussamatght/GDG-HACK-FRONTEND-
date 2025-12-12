"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Text, OrbitControls, MeshWobbleMaterial } from "@react-three/drei"
import { Suspense, useRef } from "react"
import type * as THREE from "three"

function StagePlatform({ color, completed }: { color: string; completed: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={[0, -1, 0]}>
      <cylinderGeometry args={[2, 2.2, 0.3, 6]} />
      <meshStandardMaterial
        color={completed ? "#2ECC40" : color}
        emissive={completed ? "#2ECC40" : color}
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

function FloatingOrbs({ color }: { color: string }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <Float key={i} speed={2 + i * 0.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh
            position={[
              Math.cos((i * Math.PI * 2) / 3) * 2,
              Math.sin(i * 0.5) * 0.5,
              Math.sin((i * Math.PI * 2) / 3) * 2,
            ]}
          >
            <octahedronGeometry args={[0.2, 0]} />
            <MeshWobbleMaterial color={color} emissive={color} emissiveIntensity={0.5} factor={0.4} speed={2} />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function StageNumber({ number, isBoss }: { number: number; isBoss: boolean }) {
  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <Text
        position={[0, 0.5, 0]}
        fontSize={isBoss ? 0.8 : 0.6}
        color={isBoss ? "#ff4136" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Geist-Bold.ttf"
      >
        {isBoss ? "BOSS" : number.toString()}
      </Text>
    </Float>
  )
}

interface Stage3DPreviewProps {
  stageNumber: number
  color: string
  completed: boolean
  isBoss: boolean
  className?: string
}

export function Stage3DPreview({ stageNumber, color, completed, isBoss, className }: Stage3DPreviewProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1} color={color} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />

          <StagePlatform color={color} completed={completed} />
          <FloatingOrbs color={color} />
          <StageNumber number={stageNumber} isBoss={isBoss} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}
