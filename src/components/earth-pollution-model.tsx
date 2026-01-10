// R3F Model for Earth Pollution visualization
// orchids-skip-tagging
"use client";

import * as React from "react";
import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function DebrisField({ count = 5000 }: { count?: number }) {
  const points = React.useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  const ref = React.useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
      ref.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        transparent
        color="#ff4444"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Earth() {
  const earthRef = React.useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Atmosphere Glow */}
      <Sphere args={[2.1, 64, 64]}>
        <meshBasicMaterial
          color="#4488ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Main Earth Body */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#112244"
          emissive="#001133"
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>
      
      {/* Cities/Lights Glow (Simulated with Distort) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[2.01, 64, 64]}>
          <MeshDistortMaterial
            color="#ffcc00"
            opacity={0.05}
            transparent
            distort={0.1}
            speed={2}
          />
        </Sphere>
      </Float>
    </group>
  );
}

export function EarthPollutionModel(_props: any) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Suspense fallback={null}>
          <Earth />
          <DebrisField count={8000} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
