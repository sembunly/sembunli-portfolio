import { memo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";
import CubeGroup from "../three/CubeGroup";

const CAMERA_TARGET = new THREE.Vector3(0, -0.15, 0);
const CAMERA_DISTANCE = 10.2;

function CameraDistanceLock() {
  useFrame(({ camera }) => {
    const offset = camera.position.clone().sub(CAMERA_TARGET);

    if (offset.lengthSq() < 0.0001) {
      offset.set(5.6, 4.25, 7.4);
    }

    if (Math.abs(offset.length() - CAMERA_DISTANCE) > 0.001) {
      camera.position
        .copy(CAMERA_TARGET)
        .add(offset.normalize().multiplyScalar(CAMERA_DISTANCE));
      camera.updateMatrixWorld();
    }
  });

  return null;
}

function SceneLighting() {
  return <ambientLight intensity={0.9} color="#fff7ed" />;
}

function StudioEnvironment() {
  return (
    <Environment resolution={128} background={false}>
      <Lightformer
        form="rect"
        intensity={1.4}
        color="#ffffff"
        position={[0, 5, 4]}
        scale={[5, 1.5, 1]}
      />
      <Lightformer
        form="rect"
        intensity={0.9}
        color="#e7d8c5"
        position={[-4, 1, 2]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[3, 1, 1]}
      />
      <Lightformer
        form="rect"
        intensity={1.1}
        color="#b8c0cc"
        position={[4, 0, -2]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[3, 2, 1]}
      />
    </Environment>
  );
}

function HeroCube({
  size = 1,
  autoRotate = true,
  autoRotateSpeed = 0.16,
  floating = true,
  backgroundColor = "#3e3e56",
  className = "",
  style,
}) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "420px",
        overflow: "hidden",
        background: "transparent",
        touchAction: "none",
        ...style,
      }}
    >
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{
          position: [5.6, 4.1, 7.4],
          fov: 37,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl, scene }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.22;

          gl.setClearColor(backgroundColor, 0);
          scene.background = null;
        }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={[backgroundColor, 11, 24]} />

          <SceneLighting />

          <StudioEnvironment />

          <CameraDistanceLock />

          <CubeGroup
            size={size}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            floating={floating}
          />

          <ContactShadows
            position={[0, -2.37, 0]}
            opacity={0.62}
            scale={8}
            blur={2.8}
            far={5}
            resolution={512}
            frames={1}
            color="#393838"
          />

          <OrbitControls
            makeDefault
            enablePan={false}
            enableZoom={false}
            minDistance={10.2}
            maxDistance={10.2}
            enableDamping
            dampingFactor={0.055}
            rotateSpeed={0.45}
            minPolarAngle={0.08}
            maxPolarAngle={Math.PI - 0.08}
            target={[0, -0.15, 0]}
          />

        </Suspense>
      </Canvas>
    </div>
  );
}

export default memo(HeroCube);
