import { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── GLSL Shaders (adapted from Ironhill) ── */
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec3 uColor;
  uniform float uSpread;
  varying vec2 vUv;

  float Hash(vec2 p) {
    vec3 p2 = vec3(p.xy, 1.0);
    return fract(sin(dot(p2, vec3(37.1, 61.7, 12.4))) * 3758.5453123);
  }

  float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f *= f * (3.0 - 2.0 * f);
    return mix(
      mix(Hash(i + vec2(0.0, 0.0)), Hash(i + vec2(1.0, 0.0)), f.x),
      mix(Hash(i + vec2(0.0, 1.0)), Hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    v += noise(p * 1.0) * 0.5;
    v += noise(p * 2.0) * 0.25;
    v += noise(p * 4.0) * 0.125;
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 centeredUv = (uv - 0.5) * vec2(aspect, 1.0);

    float dissolveEdge = uv.y - uProgress * 1.2;
    float noiseValue = fbm(centeredUv * 15.0);
    float d = dissolveEdge + noiseValue * uSpread;

    float pixelSize = 1.0 / uResolution.y;
    float alpha = 1.0 - smoothstep(-pixelSize, pixelSize, d);

    // Edge glow effect — adds a purple/cyan rim at the dissolve boundary
    float edgeGlow = smoothstep(0.0, 0.04, abs(d)) ;
    edgeGlow = 1.0 - edgeGlow;
    vec3 glowColor = mix(vec3(0.063, 0.725, 0.506), vec3(0.518, 0.8, 0.086), uv.x);
    vec3 finalColor = mix(uColor, uColor + glowColor * 0.6, edgeGlow);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

/* ── The dissolve plane mesh ── */
const DissolvePlane = ({ progressRef, containerRef }) => {
  const materialRef = useRef();
  const { size } = useThree();

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    }
  }, [size]);

  useFrame(() => {
    if (materialRef.current && progressRef.current !== undefined) {
      materialRef.current.uniforms.uProgress.value = progressRef.current;
    }
  });

  // Adapted color: dark background tone (#090e09 → RGB normalized)
  const color = useMemo(() => new THREE.Vector3(0.035, 0.055, 0.035), []);

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uProgress: { value: 0 },
          uResolution: { value: new THREE.Vector2(800, 600) },
          uColor: { value: color },
          uSpread: { value: 0.5 },
        }}
        transparent={true}
      />
    </mesh>
  );
};

/* ── DissolveOverlay component ── */
const DissolveOverlay = () => {
  const containerRef = useRef(null);
  const progressRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          progressRef.current = self.progress * 1.1;
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
        }}
      >
        <Canvas
          orthographic
          camera={{ left: -1, right: 1, top: 1, bottom: -1, near: 0, far: 1 }}
          dpr={[1, 2]}
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
          gl={{ alpha: true, antialias: false }}
        >
          <DissolvePlane progressRef={progressRef} containerRef={containerRef} />
        </Canvas>
      </div>
    </div>
  );
};

export default DissolveOverlay;
