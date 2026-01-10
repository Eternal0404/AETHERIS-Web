// R3F Model for Earth Pollution visualization
// orchids-skip-tagging
"use client";

import * as React from "react";
import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars, PerspectiveCamera, useTexture } from "@react-three/drei";
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
    float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
  }
`;

function DebrisField({ count = 2000 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  
  const debrisData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      r: 2.1 + Math.random() * 3.5,
      speed: 0.0005 + Math.random() * 0.002,
      angle: Math.random() * Math.PI * 2,
      axis: new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize(),
      size: 0.008 + Math.random() * 0.02,
    }));
  }, [count]);

  useFrame(() => {
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
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.1} />
    </instancedMesh>
  );
}

function CloudLayer() {
  const cloudRef = useRef<THREE.Mesh>(null);
  const clouds = useTexture("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png");
  
  useFrame(() => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y += 0.0004;
    }
  });

  return (
    <Sphere ref={cloudRef} args={[2.02, 64, 64]}>
      <meshStandardMaterial
        map={clouds}
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Sphere>
  );
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const [colorMap, normalMap, specularMap] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
  ]);
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <group>
      {/* Atmosphere Glow */}
      <mesh scale={[1.18, 1.18, 1.18]}>
        <sphereGeometry args={[2, 64, 64]} />
          <shaderMaterial
            vertexShader={atmosphereVertexShader}
            fragmentShader={atmosphereFragmentShader}
            side={THREE.BackSide}
            transparent
            blending={THREE.AdditiveBlending}
            uniforms={useMemo(() => ({}), [])}
          />
      </mesh>
      
      {/* Main Earth Body */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          specular={new THREE.Color(0x333333)}
          shininess={5}
        />
      </mesh>

      <CloudLayer />

      {/* City Lights / Specular highlight helper */}
      <Sphere args={[2.005, 64, 64]}>
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ffaa00"
          emissiveIntensity={0.5}
          transparent
          opacity={0.05}
          wireframe
        />
      </Sphere>
    </group>
  );
}

export function EarthPollutionModel(props: any) {
  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, logarithmicDepthBuffer: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={45} />
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
        <pointLight position={[-10, -5, -10]} intensity={1.5} color="#3b82f6" />
        
        <Stars radius={100} depth={50} count={10000} factor={4} saturation={0} fade speed={0.5} />
        
        <Suspense fallback={null}>
          <group rotation={[0, 0, 0.41]}>
            <Earth />
            <DebrisField count={2000} />
          </group>
          <OrbitControls 
            enableZoom={true} 
            enablePan={true}
            autoRotate 
            autoRotateSpeed={0.3}
            minDistance={3.5}
            maxDistance={12}
            dampingFactor={0.05}
            enableDamping={true}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
