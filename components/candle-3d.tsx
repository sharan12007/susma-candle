'use client'

import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Float, Environment, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function FlowerModel({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const flowerRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/flower-v1.glb')
  const flowerTexture = useLoader(THREE.TextureLoader, '/flower-v1-texture.jpg')

  const model = useMemo(() => {
    const clone = scene.clone(true)
    flowerTexture.colorSpace = THREE.SRGBColorSpace
    flowerTexture.flipY = false

    const box = new THREE.Box3().setFromObject(clone)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDimension = Math.max(size.x, size.y, size.z) || 1
    const scale = 2.8 / maxDimension

    clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
    clone.scale.setScalar(scale)
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
        child.material = new THREE.MeshStandardMaterial({
          map: flowerTexture,
          color: new THREE.Color('#f4d7df'),
          roughness: 0.65,
          metalness: 0,
          side: THREE.DoubleSide,
        })
      }
    })

    return clone
  }, [flowerTexture, scene])

  useFrame((state) => {
    if (flowerRef.current) {
      flowerRef.current.rotation.y += 0.0025

      const targetX = mousePosition.x * 0.1
      const targetZ = mousePosition.y * 0.1
      flowerRef.current.rotation.x = THREE.MathUtils.lerp(flowerRef.current.rotation.x, targetZ, 0.05)
      flowerRef.current.rotation.z = THREE.MathUtils.lerp(flowerRef.current.rotation.z, -targetX, 0.05)
      flowerRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.05
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={flowerRef} position={[0, -0.2, 0]}>
        <primitive object={model} />
      </group>
    </Float>
  )
}

function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const { viewport } = useThree()
  const scale = Math.min(viewport.width, viewport.height) / 6

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} color="#fff7ed" />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#f5c2e7" />
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={1}
        intensity={0.8}
        color="#fff5e6"
      />
      <Environment preset="studio" />
      <group scale={scale}>
        <FlowerModel mousePosition={mousePosition} />
      </group>
    </>
  )
}

useGLTF.preload('/flower-v1.glb')

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
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene mousePosition={mousePosition.current} />
        </Suspense>
      </Canvas>
    </div>
  )
}
