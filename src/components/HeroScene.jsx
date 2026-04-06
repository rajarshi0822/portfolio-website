import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

const MouseTracker = () => {
  const { size } = useThree();
  useEffect(() => {
    const onMove = (e) => {
      mouse.targetX = (e.clientX / size.width) * 2 - 1;
      mouse.targetY = -(e.clientY / size.height) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [size]);
  useFrame(() => {
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;
  });
  return null;
};

/* ── Sun — smaller, subtler ── */
const Sun = () => {
  const ref = useRef(null);
  const glowRef = useRef(null);
  const glowRef2 = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    ref.current.position.x = mouse.x * 0.15;
    ref.current.position.y = mouse.y * 0.15;
    if (glowRef.current) {
      glowRef.current.position.copy(ref.current.position);
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
    if (glowRef2.current) {
      glowRef2.current.position.copy(ref.current.position);
      glowRef2.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.2 + 1) * 0.08);
    }
  });

  return (
    <Float speed={0.8} floatIntensity={0.3}>
      <group>
        {/* Outer glow */}
        <mesh ref={glowRef2}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshBasicMaterial color="#FF6B00" transparent opacity={0.03} />
        </mesh>
        {/* Inner Glow */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#FDB813" transparent opacity={0.1} />
        </mesh>
        {/* Sun body — smaller */}
        <mesh ref={ref}>
          <sphereGeometry args={[0.35, 64, 64]} />
          <meshStandardMaterial
            color="#FDB813"
            emissive="#FF8C00"
            emissiveIntensity={1.2}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
};

/* ── Orbit Ring ── */
const OrbitRing = ({ radius }) => (
  <mesh rotation={[Math.PI / 2, 0, 0]}>
    <ringGeometry args={[radius - 0.004, radius + 0.004, 128]} />
    <meshBasicMaterial color="hsl(217, 40%, 50%)" transparent opacity={0.05} side={THREE.DoubleSide} />
  </mesh>
);

/* ── Moon ── */
const Moon = ({ size, radius, speed, color }) => {
  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} />
    </mesh>
  );
};

/* ── Planet — toned down ── */
const Planet = ({ radius, size, color, emissive, speed, parallaxFactor, hasRing, moons, opacity = 0.7 }) => {
  const groupRef = useRef(null);
  const meshRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    groupRef.current.position.x = Math.cos(t) * radius + mouse.x * parallaxFactor;
    groupRef.current.position.z = Math.sin(t) * radius * 0.4;
    groupRef.current.position.y = Math.sin(t * 0.5) * radius * 0.08 + mouse.y * parallaxFactor * 0.5;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.2}
          roughness={0.6}
          metalness={0.4}
          transparent
          opacity={opacity}
        />
      </mesh>
      {hasRing && (
        <mesh rotation={[Math.PI / 2.5, 0.2, 0]}>
          <ringGeometry args={[size * 1.4, size * 2, 64]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
            emissive={emissive}
            emissiveIntensity={0.08}
          />
        </mesh>
      )}
      {moons?.map((moon, i) => (
        <Moon key={i} {...moon} />
      ))}
    </group>
  );
};

/* ── Stars ── */
const Stars = () => {
  const count = 350;
  const ref = useRef(null);
  const { positions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4;
    }
    return { positions: pos };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y = mouse.x * 0.04;
    ref.current.rotation.x = mouse.y * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#ffffff" transparent opacity={0.65} sizeAttenuation />
    </points>
  );
};

/* ── Nebula dust ── */
const Nebula = () => {
  const count = 60;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 6;
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#7c3aed" transparent opacity={0.08} sizeAttenuation />
    </points>
  );
};

/* ── Planet configs — smaller sizes, pushed outward, more transparent ── */
const planets = [
  { radius: 2.0, size: 0.06, color: "#A0A0A0", emissive: "#606060", speed: 0.7, parallaxFactor: 0.25, opacity: 0.5 },
  { radius: 2.8, size: 0.09, color: "#E8CDA0", emissive: "#C4956A", speed: 0.5, parallaxFactor: 0.3, opacity: 0.5 },
  {
    radius: 3.5, size: 0.11, color: "#4A90D9", emissive: "#2E6BB5", speed: 0.38, parallaxFactor: 0.4, opacity: 0.55,
    moons: [{ size: 0.025, radius: 0.2, speed: 2, color: "#C0C0C0" }]
  },
  { radius: 4.2, size: 0.08, color: "#C1440E", emissive: "#8B2500", speed: 0.28, parallaxFactor: 0.45, opacity: 0.5 },
  {
    radius: 5.0, size: 0.16, color: "#C88B3A", emissive: "#A0652A", speed: 0.18, parallaxFactor: 0.55, opacity: 0.45,
    moons: [
      { size: 0.03, radius: 0.35, speed: 1.5, color: "#E8D5A3" },
      { size: 0.02, radius: 0.5, speed: 1.2, color: "#D4C4A0" },
    ]
  },
  { radius: 5.8, size: 0.14, color: "#E8D5A3", emissive: "#C4A050", speed: 0.12, parallaxFactor: 0.6, opacity: 0.4, hasRing: true },
  { radius: 6.5, size: 0.11, color: "#72B5C4", emissive: "#4A8A99", speed: 0.08, parallaxFactor: 0.65, opacity: 0.35 },
  { radius: 7.2, size: 0.10, color: "#3B5FC0", emissive: "#2A4A8B", speed: 0.06, parallaxFactor: 0.7, opacity: 0.3 },
];

const HeroScene = () => (
  <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
    <Canvas camera={{ position: [0, 1.5, 9], fov: 45 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <MouseTracker />
        <ambientLight intensity={0.06} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" distance={18} decay={2} />
        <pointLight position={[0, 0, 0]} intensity={1} color="#FF8C00" distance={22} decay={1} />
        <Sun />
        <Nebula />
        {planets.map((p, i) => <OrbitRing key={`ring-${i}`} radius={p.radius} />)}
        {planets.map((p, i) => <Planet key={`planet-${i}`} {...p} />)}
        <Stars />
      </Suspense>
    </Canvas>
  </div>
);

export default HeroScene;
