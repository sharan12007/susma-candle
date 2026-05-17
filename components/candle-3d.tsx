'use client'

import { Suspense, useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function FlowerModel({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const flowerRef = useRef<THREE.Group>(null)
  const [textureLoaded, setTextureLoaded] = useState(false)
  
  const { scene } = useGLTF('/flower-v1.glb')
  const textureLoader = new THREE.TextureLoader()
  
  let flowerTexture: THREE.Texture | null = null

  const model = useMemo(() => {
    const clone = scene.clone(true)
    
    // Load texture and apply material
    textureLoader.load(
      '/flower-v1-texture.jpg',
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace
        texture.flipY = false
        flowerTexture = texture
        setTextureLoaded(true)
      },
      undefined,
      (error) => {
        console.warn('Failed to load texture, using fallback material:', error)
        setTextureLoaded(true)
      }
    )

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
        const materialConfig: any = {
          color: new THREE.Color('#8B6F47'),
          roughness: 0.65,
          metalness: 0,
          side: THREE.DoubleSide,
        }
        if (flowerTexture) {
          materialConfig.map = flowerTexture
        }
        child.material = new THREE.MeshStandardMaterial(materialConfig)
      }
    })

    return clone
  }, [scene, textureLoader])

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
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} color="#fff7ed" />
      <pointLight position={[-5, 3, -5]} intensity={0.8} color="#f5c2e7" />
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={1}
        intensity={1.2}
        color="#fff5e6"
      />
      <Environment preset="studio" blur={0.4} />
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
        gl={{ 
          antialias: true, 
          alpha: true,
          preserveDrawingBuffer: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0xffffff, 0)
          gl.setClearAlpha(0)
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
