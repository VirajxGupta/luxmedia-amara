'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface AmaraWaterCanvasProps {
  scrollProgress?: number;
  className?: string;
}

// Shader for Realistic Ocean Swells with Sun Beam Track & Interactive Mouse Ripples
const OceanShader = {
  uniforms: {
    uTime: { value: 0 },
    uScrollProgress: { value: 0 },
    uMouse: { value: new THREE.Vector2(-10, -10) },
    uSunPosition: { value: new THREE.Vector3(0, 18, -80) },
    uSunColor: { value: new THREE.Color('#FDE047') },
    uWaterDeep: { value: new THREE.Color('#061824') },
    uWaterShallow: { value: new THREE.Color('#164B67') },
    uSkyHorizon: { value: new THREE.Color('#BAE6FD') },
  },
  vertexShader: /* glsl */ `
    uniform float uTime;
    uniform float uScrollProgress;
    uniform vec2 uMouse;

    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vWaveHeight;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float t = uTime * 0.85;

      // Compound organic ocean swells
      float swell1 = sin(pos.x * 0.07 + t * 1.2) * cos(pos.y * 0.07 + t * 0.9) * 0.8;
      float swell2 = sin(pos.x * 0.16 - t * 1.5) * sin(pos.y * 0.12 + t * 1.1) * 0.4;
      float micro = cos(pos.x * 0.35 + t * 2.4) * sin(pos.y * 0.3 - t * 1.9) * 0.15;

      // Mouse ripple perturbation
      float distToMouse = distance(pos.xy, uMouse);
      float mouseRipple = sin(distToMouse * 2.5 - t * 6.0) * exp(-distToMouse * 0.4) * 0.35;

      float totalWave = swell1 + swell2 + micro + mouseRipple;
      pos.z += totalWave;
      vWaveHeight = totalWave;

      vec3 tangent = vec3(1.0, 0.0, (cos(pos.x * 0.07 + t * 1.2) * 0.08));
      vec3 bitangent = vec3(0.0, 1.0, (-sin(pos.y * 0.07 + t * 0.9) * 0.08));
      vNormal = normalize(cross(tangent, bitangent));

      vec4 worldPos = modelMatrix * vec4(pos, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uSunPosition;
    uniform vec3 uSunColor;
    uniform vec3 uWaterDeep;
    uniform vec3 uWaterShallow;
    uniform vec3 uSkyHorizon;
    uniform float uScrollProgress;

    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vWaveHeight;

    void main() {
      vec3 viewDir = normalize(cameraPosition - vWorldPosition);
      vec3 normal = normalize(vNormal);

      float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 2.6);
      fresnel = clamp(fresnel, 0.12, 0.94);

      vec3 sunDir = normalize(uSunPosition - vWorldPosition);
      vec3 reflectDir = reflect(-sunDir, normal);
      float spec = pow(max(0.0, dot(viewDir, reflectDir)), 36.0);
      
      float trackGlow = pow(max(0.0, dot(normalize(vWorldPosition - cameraPosition), -sunDir)), 14.0);
      vec3 sunBeam = uSunColor * (spec * 4.2 + trackGlow * 0.6);

      float crestMix = smoothstep(-0.7, 0.7, vWaveHeight);
      vec3 waterBody = mix(uWaterDeep, uWaterShallow, crestMix);

      vec3 finalColor = mix(waterBody, uSkyHorizon, fresnel * 0.72);
      finalColor += sunBeam;

      if (vWaveHeight > 0.45) {
        float foam = smoothstep(0.45, 0.85, vWaveHeight);
        finalColor += vec3(0.25, 0.28, 0.32) * foam;
      }

      gl_FragColor = vec4(finalColor, 0.95);
    }
  `,
};

function WaterMesh({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const lerpProgress = useRef(scrollProgress);

  const shaderMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(OceanShader.uniforms),
      vertexShader: OceanShader.vertexShader,
      fragmentShader: OceanShader.fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  const colorPalette = useMemo(() => {
    return {
      daySun: new THREE.Color('#FEF08A'),
      dayDeep: new THREE.Color('#061824'),
      dayShallow: new THREE.Color('#164B67'),
      dayHorizon: new THREE.Color('#BAE6FD'),

      sunsetSun: new THREE.Color('#FF5500'),
      sunsetDeep: new THREE.Color('#0F1720'),
      sunsetShallow: new THREE.Color('#C1683B'),
      sunsetHorizon: new THREE.Color('#F97316'),

      duskSun: new THREE.Color('#38BDF8'),
      duskDeep: new THREE.Color('#02060C'),
      duskShallow: new THREE.Color('#0B1C2B'),
      duskHorizon: new THREE.Color('#0F172A'),
    };
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value += delta;

    // Fast responsive lerp (0.2) for 1:1 real-time sync with scroll
    lerpProgress.current = THREE.MathUtils.lerp(lerpProgress.current, scrollProgress, 0.2);
    const p = Math.min(Math.max(lerpProgress.current, 0), 1);
    mat.uniforms.uScrollProgress.value = p;

    mat.uniforms.uMouse.value.set(
      (state.pointer.x * viewport.width) / 2,
      (state.pointer.y * viewport.height) / 2
    );

    const sunY = 24 - p * 42;
    mat.uniforms.uSunPosition.value.set(0, sunY, -80);

    const targetSun = new THREE.Color();
    const targetDeep = new THREE.Color();
    const targetShallow = new THREE.Color();
    const targetHorizon = new THREE.Color();

    if (p < 0.5) {
      const f = p * 2;
      targetSun.lerpColors(colorPalette.daySun, colorPalette.sunsetSun, f);
      targetDeep.lerpColors(colorPalette.dayDeep, colorPalette.sunsetDeep, f);
      targetShallow.lerpColors(colorPalette.dayShallow, colorPalette.sunsetShallow, f);
      targetHorizon.lerpColors(colorPalette.dayHorizon, colorPalette.sunsetHorizon, f);
    } else {
      const f = (p - 0.5) * 2;
      targetSun.lerpColors(colorPalette.sunsetSun, colorPalette.duskSun, f);
      targetDeep.lerpColors(colorPalette.sunsetDeep, colorPalette.duskDeep, f);
      targetShallow.lerpColors(colorPalette.duskShallow, colorPalette.duskShallow, f);
      targetHorizon.lerpColors(colorPalette.sunsetHorizon, colorPalette.duskHorizon, f);
    }

    mat.uniforms.uSunColor.value.copy(targetSun);
    mat.uniforms.uWaterDeep.value.copy(targetDeep);
    mat.uniforms.uWaterShallow.value.copy(targetShallow);
    mat.uniforms.uSkyHorizon.value.copy(targetHorizon);
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2 + 0.16, 0, 0]}
      position={[0, -3.5, -12]}
      material={shaderMat}
    >
      <planeGeometry args={[160, 160, 80, 80]} />
    </mesh>
  );
}

// Floating Particles
function FloatingSeaParticles({ scrollProgress }: { scrollProgress: number }) {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const count = 75;
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = Math.random() * 8 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50 - 10;
    }
    return [pos];
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < 75; i++) {
      pos[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.003;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.22}
        color={scrollProgress < 0.5 ? '#FEF08A' : '#FF9933'}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Horizon & Dynamic Camera perfectly synchronized
function AmalfiCoastHorizon({ scrollProgress }: { scrollProgress: number }) {
  const sunMesh = useRef<THREE.Mesh>(null);
  const fogRef = useRef<THREE.FogExp2>(null);
  const lerpProgress = useRef(scrollProgress);

  useFrame((state) => {
    lerpProgress.current = THREE.MathUtils.lerp(lerpProgress.current, scrollProgress, 0.2);
    const p = Math.min(Math.max(lerpProgress.current, 0), 1);

    const camY = 5.5 - p * 4.2;
    const camZ = 20.0 - p * 11.0;

    state.camera.position.set(0, camY, camZ);
    state.camera.lookAt(0, -1 + p * 1.5, -30);

    const sunY = 22 - p * 40;
    if (sunMesh.current) {
      sunMesh.current.position.set(0, sunY, -75);
    }

    if (fogRef.current) {
      const cDay = new THREE.Color('#BAE6FD');
      const cSunset = new THREE.Color('#C1683B');
      const cDusk = new THREE.Color('#050E17');

      const targetFog = new THREE.Color();
      if (p < 0.5) targetFog.lerpColors(cDay, cSunset, p * 2);
      else targetFog.lerpColors(cSunset, cDusk, (p - 0.5) * 2);

      fogRef.current.color.copy(targetFog);
    }
  });

  return (
    <>
      <fogExp2 ref={fogRef} attach="fog" args={['#BAE6FD', 0.012]} />

      {/* Sun Disc */}
      <mesh ref={sunMesh} position={[0, 22, -75]}>
        <sphereGeometry args={[6.5, 32, 32]} />
        <meshBasicMaterial
          color={scrollProgress < 0.5 ? '#FEF08A' : '#FF4500'}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

export default function AmaraWaterCanvas({ scrollProgress = 0, className = '' }: AmaraWaterCanvasProps) {
  return (
    <div className={`relative w-full h-full min-h-[600px] overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 5.5, 20], fov: 50, near: 0.1, far: 220 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[0, 25, -60]} intensity={1.5} />
        <AmalfiCoastHorizon scrollProgress={scrollProgress} />
        <WaterMesh scrollProgress={scrollProgress} />
        <FloatingSeaParticles scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
