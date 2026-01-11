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
    float intensity = pow(0.8 - dot(vNormal, normalize(vEyeVector)), 2.0);
    gl_FragColor = vec4(0.0, 0.5, 1.0, 1.0) * intensity;
  }
`;

const DEBRIS_TYPES = {
  satellite: { color: '#88ccff', emissive: '#4488ff', size: [0.08, 0.15] },
  rocketStage: { color: '#cccccc', emissive: '#666666', size: [0.1, 0.2] },
  fragment: { color: '#ff6644', emissive: '#ff3311', size: [0.01, 0.04] },
  smallDebris: { color: '#ffaa44', emissive: '#ff6600', size: [0.005, 0.015] },
};

function SatelliteDebris({ data, tempObject, meshRef, index }: any) {
  return null;
}

function DebrisField({ count = 2500 }: { count?: number }) {
  const fragmentMeshRef = useRef<THREE.InstancedMesh>(null);
  const satelliteMeshRef = useRef<THREE.InstancedMesh>(null);
  const rocketMeshRef = useRef<THREE.InstancedMesh>(null);
  const smallMeshRef = useRef<THREE.InstancedMesh>(null);
  
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);
  
  const fragmentCount = Math.floor(count * 0.6);
  const satelliteCount = Math.floor(count * 0.08);
  const rocketCount = Math.floor(count * 0.05);
  const smallCount = count - fragmentCount - satelliteCount - rocketCount;

  const createOrbitalData = (num: number, type: keyof typeof DEBRIS_TYPES, baseAlt: number, altRange: number) => {
    const typeData = DEBRIS_TYPES[type];
    return Array.from({ length: num }, (_, i) => {
      const inclination = (Math.random() - 0.5) * Math.PI * 0.8;
      const eccentricity = Math.random() * 0.15;
      return {
        semiMajorAxis: baseAlt + Math.random() * altRange,
        eccentricity,
        inclination,
        longitudeAscending: Math.random() * Math.PI * 2,
        argumentPeriapsis: Math.random() * Math.PI * 2,
        meanAnomaly: Math.random() * Math.PI * 2,
        speed: 0.0003 + Math.random() * 0.0015,
        tumbleSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        size: typeData.size[0] + Math.random() * (typeData.size[1] - typeData.size[0]),
        brightness: 0.5 + Math.random() * 0.5,
      };
    });
  };

  const fragmentData = useMemo(() => createOrbitalData(fragmentCount, 'fragment', 2.2, 2.0), [fragmentCount]);
  const satelliteData = useMemo(() => createOrbitalData(satelliteCount, 'satellite', 2.3, 1.5), [satelliteCount]);
  const rocketData = useMemo(() => createOrbitalData(rocketCount, 'rocketStage', 2.4, 2.5), [rocketCount]);
  const smallData = useMemo(() => createOrbitalData(smallCount, 'smallDebris', 2.1, 3.0), [smallCount]);

  const getOrbitalPosition = (data: any, time: number) => {
    const angle = data.meanAnomaly + time * data.speed;
    const r = data.semiMajorAxis * (1 - data.eccentricity * data.eccentricity) / 
              (1 + data.eccentricity * Math.cos(angle));
    
    const xOrbital = r * Math.cos(angle);
    const yOrbital = r * Math.sin(angle);
    
    const cosO = Math.cos(data.longitudeAscending);
    const sinO = Math.sin(data.longitudeAscending);
    const cosI = Math.cos(data.inclination);
    const sinI = Math.sin(data.inclination);
    const cosW = Math.cos(data.argumentPeriapsis);
    const sinW = Math.sin(data.argumentPeriapsis);
    
    const x = (cosO * cosW - sinO * sinW * cosI) * xOrbital + 
              (-cosO * sinW - sinO * cosW * cosI) * yOrbital;
    const y = (sinO * cosW + cosO * sinW * cosI) * xOrbital + 
              (-sinO * sinW + cosO * cosW * cosI) * yOrbital;
    const z = (sinW * sinI) * xOrbital + (cosW * sinI) * yOrbital;
    
    return new THREE.Vector3(x, y, z);
  };

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    const updateMesh = (meshRef: React.RefObject<THREE.InstancedMesh | null>, dataArray: any[], hasColor = false) => {
      if (!meshRef.current) return;
      
      dataArray.forEach((data, i) => {
        const pos = getOrbitalPosition(data, time);
        tempObject.position.copy(pos);
        
        data.rotation.x += data.tumbleSpeed.x;
        data.rotation.y += data.tumbleSpeed.y;
        data.rotation.z += data.tumbleSpeed.z;
        tempObject.rotation.copy(data.rotation);
        
        tempObject.scale.setScalar(data.size);
        tempObject.updateMatrix();
        meshRef.current?.setMatrixAt(i, tempObject.matrix);
        
        if (hasColor && meshRef.current) {
          const flicker = 0.7 + Math.sin(time * 2 + i) * 0.3;
          tempColor.setHSL(0.08, 0.9, data.brightness * flicker * 0.5);
          meshRef.current.setColorAt(i, tempColor);
        }
      });
      
      meshRef.current.instanceMatrix.needsUpdate = true;
      if (hasColor && meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
    };

    updateMesh(fragmentMeshRef, fragmentData, true);
    updateMesh(satelliteMeshRef, satelliteData);
    updateMesh(rocketMeshRef, rocketData);
    updateMesh(smallMeshRef, smallData, true);
  });

  return (
    <group>
      <instancedMesh ref={fragmentMeshRef} args={[undefined, undefined, fragmentCount]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#ff6644" 
          emissive="#ff3311" 
          emissiveIntensity={0.8}
          metalness={0.9} 
          roughness={0.3}
          envMapIntensity={1}
        />
      </instancedMesh>

      <instancedMesh ref={satelliteMeshRef} args={[undefined, undefined, satelliteCount]}>
        <boxGeometry args={[1, 0.3, 2]} />
        <meshStandardMaterial 
          color="#88ccff" 
          emissive="#2266aa" 
          emissiveIntensity={0.5}
          metalness={1} 
          roughness={0.2}
        />
      </instancedMesh>

      <instancedMesh ref={rocketMeshRef} args={[undefined, undefined, rocketCount]}>
        <cylinderGeometry args={[0.3, 0.5, 2, 8]} />
        <meshStandardMaterial 
          color="#dddddd" 
          emissive="#444444" 
          emissiveIntensity={0.3}
          metalness={0.95} 
          roughness={0.15}
        />
      </instancedMesh>

      <instancedMesh ref={smallMeshRef} args={[undefined, undefined, smallCount]}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#ffaa44" 
          emissive="#ff6600" 
          emissiveIntensity={1.2}
          metalness={0.7} 
          roughness={0.4}
        />
      </instancedMesh>
    </group>
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
      earthRef.current.rotation.y += 0.001;
    }
  });

  const atmosphereUniforms = useMemo(() => ({}), []);

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
            uniforms={atmosphereUniforms}
            depthWrite={false}
          />
      </mesh>
      
      {/* Main Earth Body */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          specular={new THREE.Color(0x3333ff)}
          shininess={10}
          color="#ccffcc"
        />
      </mesh>

      <CloudLayer />

      {/* Techy Grid Overlay */}
      <Sphere args={[2.005, 64, 64]}>
        <meshBasicMaterial
          color="#22c55e"
          transparent
          opacity={0.1}
          wireframe
        />
      </Sphere>

      {/* Orbital Ring */}
      <mesh rotation={[Math.PI / 2, 0.3, 0]}>
        <ringGeometry args={[3.2, 3.21, 128]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function OrbitalRings() {
  return (
    <group>
      {[2.5, 3.0, 3.5, 4.2].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + (i * 0.15), i * 0.2, 0]}>
          <ringGeometry args={[radius, radius + 0.005, 128]} />
          <meshBasicMaterial 
            color={i < 2 ? "#ef4444" : "#3b82f6"} 
            transparent 
            opacity={0.15 - i * 0.03} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      ))}
    </group>
  );
}

function DebrisGlow() {
  const glowRef = useRef<THREE.Points>(null);
  const particleCount = 500;
  
  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.3 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;
      arr[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      arr[i * 3 + 1] = radius * Math.sin(phi);
      arr[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    return arr;
  }, []);

  const sizes = useMemo(() => {
    const arr = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      arr[i] = 0.02 + Math.random() * 0.05;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      glowRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={glowRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ff6644"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function EarthPollutionModel(props: any) {
  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, logarithmicDepthBuffer: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={45} />
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 5, 10]} intensity={2.0} color="#fffcf0" />
        <pointLight position={[-10, -5, -10]} intensity={1.0} color="#3b82f6" />
        <pointLight position={[5, 0, -5]} intensity={0.5} color="#ff6644" />
        
        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade speed={1} />
        
        <Suspense fallback={null}>
          <group rotation={[0, 0, 0.41]}>
            <Earth />
            <DebrisField count={2500} />
            <OrbitalRings />
            <DebrisGlow />
          </group>
          <OrbitControls 
            enableZoom={true} 
            enablePan={true}
            autoRotate 
            autoRotateSpeed={0.4}
            minDistance={3.5}
            maxDistance={12}
            dampingFactor={0.05}
            enableDamping={true}
            makeDefault
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
