"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCoarsePointer } from "@/lib/useCoarsePointer";

const ACCENT_A = new THREE.Color("#00ff87");
const ACCENT_B = new THREE.Color("#60efff");

type RingConfig = {
  radius: number;
  tube: number;
  axis: THREE.Vector3;
  speed: number;
  colorMix: number;
};

const RINGS: RingConfig[] = [
  { radius: 1.5, tube: 0.045, axis: new THREE.Vector3(1, 0.3, 0), speed: 0.09, colorMix: 0 },
  { radius: 1.18, tube: 0.045, axis: new THREE.Vector3(0.2, 1, 0.4), speed: -0.13, colorMix: 0.5 },
  { radius: 0.86, tube: 0.045, axis: new THREE.Vector3(0.6, -0.4, 1), speed: 0.17, colorMix: 1 },
];

function Ring({
  config,
  index,
  lowPower,
}: {
  config: RingConfig;
  index: number;
  lowPower: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const color = useMemo(
    () => ACCENT_A.clone().lerp(ACCENT_B, config.colorMix),
    [config.colorMix],
  );

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotateOnAxis(config.axis.clone().normalize(), config.speed * 0.016);
    const breathe = 1 + Math.sin(t * 0.6 + index) * 0.03;
    mesh.current.scale.setScalar(breathe);
  });

  return (
    <mesh ref={mesh}>
      <torusGeometry
        args={
          lowPower
            ? [config.radius, config.tube, 12, 48]
            : [config.radius, config.tube, 24, 120]
        }
      />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.65}
        roughness={0.25}
        metalness={0.4}
      />
    </mesh>
  );
}

function Scene({ lowPower }: { lowPower: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const nx = (state.pointer.x * viewport.width) / 10;
    const ny = (state.pointer.y * viewport.height) / 10;
    target.current.x += (ny - target.current.x) * 0.04;
    target.current.y += (nx - target.current.y) * 0.04;
    if (group.current) {
      group.current.rotation.x = target.current.x * 0.6;
      group.current.rotation.y = target.current.y * 0.6;
    }
  });

  return (
    <group ref={group}>
      {RINGS.map((config, i) => (
        <Ring key={i} config={config} index={i} lowPower={lowPower} />
      ))}
    </group>
  );
}

export function HeroRings() {
  // Touch devices (phones, tablets) get a capped pixel ratio, no AA, and
  // lower-poly geometry — the standard levers for avoiding WebGL jank and
  // battery drain on mobile GPUs, without pausing the animation itself.
  const lowPower = useCoarsePointer();

  return (
    <Canvas
      dpr={lowPower ? 1 : [1, 1.75]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: !lowPower, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 2, 4]} intensity={30} color="#60efff" />
      <pointLight position={[-3, -2, -2]} intensity={20} color="#00ff87" />
      <Scene lowPower={lowPower} />
    </Canvas>
  );
}
