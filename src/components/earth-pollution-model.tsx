// R3F Model for Earth Pollution visualization
// orchids-skip-tagging
"use client";

import * as React from "react";
import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Custom Atmosphere Shader
const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vEyeVector;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vEyeVector = -vec3(mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const atmosphereFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vEyeVector;
  void main() {
    float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
  }
`;

function DebrisField({ count = 2000 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  
  const debrisData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      r: 2.2 + Math.random() * 3,
      speed: 0.001 + Math.random() * 0.005,
      angle: Math.random() * Math.PI * 2,
      axis: new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize(),
      size: 0.01 + Math.random() * 0.03,
      color: Math.random() > 0.8 ? "#ff4444" : "#888888"
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    debrisData.forEach((data, i) => {
      data.angle += data.speed;
      const pos = new THREE.Vector3(data.r, 0, 0).applyAxisAngle(data.axis, data.angle);
      tempObject.position.copy(pos);
      tempObject.scale.setScalar(data.size);
      tempObject.lookAt(0, 0, 0);
      tempObject.updateMatrix();
      meshRef.current?.setMatrixAt(i, tempObject.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
    </instancedMesh>
  );
}

function CloudLayer() {
  const cloudRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y += 0.0007;
      cloudRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <Sphere ref={cloudRef} args={[2.05, 64, 64]}>
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.3}
        alphaTest={0.1}
        depthWrite={false}
      />
    </Sphere>
  );
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Atmosphere Glow */}
      <mesh scale={[1.15, 1.15, 1.15]}>
        <sphereGeometry args={[2, 64, 64]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          side={THREE.BackSide}
          transparent
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Main Earth Body */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#1a365d"
          emissive="#0a192f"
          roughness={0.5}
          metalness={0.2}
        />
        {/* Continent Simulation - Using a simple emissive pattern if we had textures, 
            but here we'll use a slightly darker base */}
      </mesh>

      <CloudLayer />

      {/* City Lights Simulation */}
      <Sphere args={[2.01, 64, 64]}>
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ffaa00"
          emissiveIntensity={2}
          transparent
          opacity={0.1}
          wireframe
        />
      </Sphere>
    </group>
  );
}

export function EarthPollutionModel(props: any) {
  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 5, 10]} intensity={2.5} color="#ffffff" />
        <pointLight position={[-10, -5, -10]} intensity={1} color="#3b82f6" />
        
        <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
        
        <Suspense fallback={null}>
          <group rotation={[0, 0, 0.4]}>
            <Earth />
            <DebrisField count={1500} />
          </group>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
