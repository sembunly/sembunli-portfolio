import { memo, useMemo } from "react";
import { Edges, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const MATERIAL_PRESETS = {
  matte: {
    color: "rgb(250, 255, 253)",
    roughness: 0.8,
    metalness: 0.12,
    clearcoat: 0.08,
    clearcoatRoughness: 0.7,
  },

  satin: {
    color: "#2b2d31)",
    roughness: 0.42,
    metalness: 0.38,
    clearcoat: 0.35,
    clearcoatRoughness: 0.3,
  },

  metal: {
    color: "#2b2d31",
    roughness: 0.28,
    metalness: 0.94,
    clearcoat: 0.55,
    clearcoatRoughness: 0.16,
  },

  glossy: {
    color: "rgb(250, 255, 253)",
    roughness: 0.07,
    metalness: 0.48,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
  },
};

function getSurfaceTransform(surfaceDirection, pieceSize) {
  const offset = pieceSize / 2 + 0.003;

  switch (surfaceDirection) {
    case "left":
      return {
        position: [-offset, 0, 0],
        rotation: [0, -Math.PI / 2, 0],
      };

    case "right":
      return {
        position: [offset, 0, 0],
        rotation: [0, Math.PI / 2, 0],
      };

    case "top":
      return {
        position: [0, offset, 0],
        rotation: [-Math.PI / 2, 0, 0],
      };

    case "bottom":
      return {
        position: [0, -offset, 0],
        rotation: [Math.PI / 2, 0, 0],
      };

    case "back":
      return {
        position: [0, 0, -offset],
        rotation: [0, Math.PI, 0],
      };

    case "front":
    default:
      return {
        position: [0, 0, offset],
        rotation: [0, 0, 0],
      };
  }
}

function PerforatedSurface({ pieceSize, surfaceDirection }) {
  const transform = useMemo(
    () => getSurfaceTransform(surfaceDirection, pieceSize),
    [surfaceDirection, pieceSize],
  );

  const holes = useMemo(() => {
    const spacing = pieceSize * 0.105;
    const result = [];

    for (let row = -2.5; row <= 2.5; row += 1) {
      for (let column = -2.5; column <= 2.5; column += 1) {
        result.push({
          key: `${row}-${column}`,
          position: [column * spacing, row * spacing, 0.012],
        });
      }
    }

    return result;
  }, [pieceSize]);

  return (
    <group position={transform.position} rotation={transform.rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry
          args={[pieceSize * 0.72, pieceSize * 0.72, pieceSize * 0.035]}
        />

        <meshPhysicalMaterial
          color="#191b1e"
          roughness={0.32}
          metalness={0.76}
          clearcoat={0.65}
          clearcoatRoughness={0.18}
        />
      </mesh>

      {holes.map((hole) => (
        <mesh key={hole.key} position={hole.position}>
          <circleGeometry args={[pieceSize * 0.026, 12]} />

          <meshBasicMaterial
            color="#030304"
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function GridSurface({ pieceSize, surfaceDirection }) {
  const transform = useMemo(
    () => getSurfaceTransform(surfaceDirection, pieceSize),
    [surfaceDirection, pieceSize],
  );

  const lineLength = pieceSize * 0.73;
  const lineWidth = pieceSize * 0.018;
  const lineOffset = pieceSize * 0.225;

  return (
    <group position={transform.position} rotation={transform.rotation}>
      <mesh>
        <boxGeometry
          args={[pieceSize * 0.78, pieceSize * 0.78, pieceSize * 0.025]}
        />

        <meshPhysicalMaterial
          color="#08090b"
          roughness={0.2}
          metalness={0.65}
          clearcoat={0.8}
          clearcoatRoughness={0.12}
        />
      </mesh>

      {[-lineOffset, 0, lineOffset].map((offset) => (
        <mesh key={`vertical-${offset}`} position={[offset, 0, 0.018]}>
          <boxGeometry args={[lineWidth, lineLength, lineWidth]} />

          <meshBasicMaterial color="#303339" toneMapped={false} />
        </mesh>
      ))}

      {[-lineOffset, 0, lineOffset].map((offset) => (
        <mesh key={`horizontal-${offset}`} position={[0, offset, 0.018]}>
          <boxGeometry args={[lineLength, lineWidth, lineWidth]} />

          <meshBasicMaterial color="#303339" toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function GlossySurface({ pieceSize, surfaceDirection }) {
  const transform = useMemo(
    () => getSurfaceTransform(surfaceDirection, pieceSize),
    [surfaceDirection, pieceSize],
  );

  return (
    <RoundedBox
      args={[pieceSize * 0.78, pieceSize * 0.78, pieceSize * 0.035]}
      radius={pieceSize * 0.07}
      smoothness={3}
      position={transform.position}
      rotation={transform.rotation}
      castShadow
      receiveShadow
    >
      <meshPhysicalMaterial
        color="#07080a"
        roughness={0.04}
        metalness={0.62}
        clearcoat={1}
        clearcoatRoughness={0.04}
        envMapIntensity={1.9}
      />
    </RoundedBox>
  );
}

function CubePiece({
  position,
  pieceSize = 0.92,
  materialType = "matte",
  surfaceType = "plain",
  surfaceDirection = "front",
  emissive = false,
}) {
  const material = MATERIAL_PRESETS[materialType] ?? MATERIAL_PRESETS.matte;
  const isGlass = materialType === "glass";

  return (
    <group position={position}>
      <RoundedBox
        args={[pieceSize, pieceSize, pieceSize]}
        radius={pieceSize * 0.115}
        smoothness={3}
        bevelSegments={3}
        castShadow
        receiveShadow
      >
        {isGlass ? (
          <meshPhysicalMaterial
            color="#aeb5c2"
            roughness={0.08}
            metalness={0.05}
            transmission={0.92}
            thickness={0.8}
            ior={1.45}
            transparent
            opacity={0.78}
            envMapIntensity={2.1}
            clearcoat={1}
            clearcoatRoughness={0.06}
            attenuationColor="#171a20"
            attenuationDistance={1.8}
          />
        ) : (
          <meshPhysicalMaterial
            color={material.color}
            roughness={material.roughness}
            metalness={material.metalness}
            clearcoat={material.clearcoat}
            clearcoatRoughness={material.clearcoatRoughness}
            envMapIntensity={1.7}
            emissive={emissive ? "#20242d" : "#000000"}
            emissiveIntensity={emissive ? 1.8 : 0}
            toneMapped={!emissive}
          />
        )}
        <Edges threshold={20} color="#272a2f" />
      </RoundedBox>

      {!isGlass && surfaceType === "perforated" && (
        <PerforatedSurface
          pieceSize={pieceSize}
          surfaceDirection={surfaceDirection}
        />
      )}

      {!isGlass && surfaceType === "grid" && (
        <GridSurface
          pieceSize={pieceSize}
          surfaceDirection={surfaceDirection}
        />
      )}

      {!isGlass && surfaceType === "glossy" && (
        <GlossySurface
          pieceSize={pieceSize}
          surfaceDirection={surfaceDirection}
        />
      )}
    </group>
  );
}

export default memo(CubePiece);
