'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Candle({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const candleRef = useRef<THREE.Group>(null)
  const flameRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.PointLight>(null)

  // Create wax material with realistic properties
  const waxMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f5e6d3'),
      roughness: 0.4,
      metalness: 0.0,
      emissive: new THREE.Color('#3d2817'),
      emissiveIntensity: 0.1,
    })
  }, [])

  const wickMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1a1a1a'),
      roughness: 0.9,
      metalness: 0,
    })
  }, [])

  useFrame((state) => {
    if (candleRef.current) {
      // Slow rotation
      candleRef.current.rotation.y += 0.002

      // Respond to mouse movement
      const targetX = mousePosition.x * 0.1
      const targetZ = mousePosition.y * 0.1
      candleRef.current.rotation.x = THREE.MathUtils.lerp(candleRef.current.rotation.x, targetZ, 0.05)
      candleRef.current.rotation.z = THREE.MathUtils.lerp(candleRef.current.rotation.z, -targetX, 0.05)
    }

    // Animate flame
    if (flameRef.current) {
      const time = state.clock.getElapsedTime()
      flameRef.current.scale.x = 1 + Math.sin(time * 8) * 0.1
      flameRef.current.scale.y = 1 + Math.sin(time * 10) * 0.15
      flameRef.current.position.x = Math.sin(time * 6) * 0.02
    }

    // Animate glow intensity
    if (glowRef.current) {
      const time = state.clock.getElapsedTime()
      glowRef.current.intensity = 2 + Math.sin(time * 8) * 0.5
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={candleRef} position={[0, -0.5, 0]}>
        {/* Glass container */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[1.1, 1, 2, 32, 1, true]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.1}
            transmission={0.95}
            roughness={0.1}
            color="#f5e6d3"
          />
        </mesh>

        {/* Wax */}
        <mesh material={waxMaterial} position={[0, 0.3, 0]}>
          <cylinderGeometry args={[1, 1, 1.2, 32]} />
        </mesh>

        {/* Wick */}
        <mesh material={wickMaterial} position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        </mesh>

        {/* Flame core */}
        <mesh ref={flameRef} position={[0, 1.45, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#fff8e7" />
        </mesh>

        {/* Flame outer */}
        <mesh position={[0, 1.5, 0]} scale={[1, 1.5, 1]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#ffb347" transparent opacity={0.6} />
        </mesh>

        {/* Flame glow */}
        <mesh position={[0, 1.55, 0]} scale={[1, 2, 1]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="#ff8c00" transparent opacity={0.2} />
        </mesh>

        {/* Point light for flame glow */}
        <pointLight
          ref={glowRef}
          position={[0, 1.5, 0]}
          color="#ffaa44"
          intensity={2}
          distance={5}
          decay={2}
        />

        {/* Base rim */}
        <mesh position={[0, -0.1, 0]}>
          <torusGeometry args={[1.05, 0.08, 16, 32]} />
          <meshStandardMaterial color="#c4a574" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  )
}

function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const { viewport } = useThree()
  const scale = Math.min(viewport.width, viewport.height) / 6

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffcc88" />
      <pointLight position={[-5, 3, -5]} intensity={0.3} color="#8888ff" />
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={1}
        intensity={0.5}
        color="#fff5e6"
      />
      <Environment preset="night" />
      <group scale={scale}>
        <Candle mousePosition={mousePosition} />
      </group>
    </>
  )
}

export default function Candle3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      mousePosition.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene mousePosition={mousePosition.current} />
      </Canvas>
    </div>
  )
}
