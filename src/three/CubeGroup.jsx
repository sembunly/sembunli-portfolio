import { memo, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import CubePiece from "./CubePiece";

function seededRandom(seed) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function getSurfaceDirection(x, y, z) {
  const distances = [
    { direction: x > 0 ? "right" : "left", value: Math.abs(x) },
    { direction: y > 0 ? "top" : "bottom", value: Math.abs(y) },
    { direction: z > 0 ? "front" : "back", value: Math.abs(z) },
  ];

  distances.sort((a, b) => b.value - a.value);
  return distances[0].direction;
}

function createCubePieces(spacing) {
  const pieces = [];
  let index = 0;

  for (let x = -1; x <= 1; x += 1) {
    for (let y = -1; y <= 1; y += 1) {
      for (let z = -1; z <= 1; z += 1) {
        const materialRandom = seededRandom(index + 1);
        const surfaceRandom = seededRandom(index + 41);
        let materialType = "matte";
        let surfaceType = "plain";

        if (materialRandom > 0.78) materialType = "metal";
        else if (materialRandom > 0.48) materialType = "satin";
        else if (materialRandom > 0.38) materialType = "glossy";

        if (materialType !== "glass") {
          if (surfaceRandom > 0.82) surfaceType = "perforated";
          else if (surfaceRandom > 0.68) surfaceType = "grid";
          else if (surfaceRandom > 0.55) surfaceType = "glossy";
        }

        pieces.push({
          id: `${x}-${y}-${z}`,
          coordinate: [x, y, z],
          position: [x * spacing, y * spacing, z * spacing],
          materialType,
          surfaceType,
          surfaceDirection: getSurfaceDirection(x, y, z),
          emissive: false,
        });
        index += 1;
      }
    }
  }

  return pieces;
}

function AnimatedCube({
  size,
  autoRotate,
  autoRotateSpeed,
  pieceSize,
  spacing,
}) {
  const groupRef = useRef(null);
  const pieceRefs = useRef(new Map());
  const turnRef = useRef({ active: false, previousMove: "" });
  const pieces = useMemo(() => createCubePieces(spacing), [spacing]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (autoRotate) {
      groupRef.current.rotation.y += delta * autoRotateSpeed;
      groupRef.current.rotation.x += delta * autoRotateSpeed * 0.32;
    }
    groupRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.22) * 0.025;

    const elapsed = state.clock.elapsedTime;
    let turn = turnRef.current;

    if (!turn.active) {
      let axisIndex;
      let layer;
      let direction;
      let moveKey;

      do {
        axisIndex = Math.floor(Math.random() * 3);
        layer = Math.random() < 0.5 ? -1 : 1;
        direction = Math.random() < 0.5 ? -1 : 1;
        moveKey = `${axisIndex}-${layer}-${direction}`;
      } while (moveKey === turn.previousMove);

      const axis = new THREE.Vector3(
        axisIndex === 0 ? 1 : 0,
        axisIndex === 1 ? 1 : 0,
        axisIndex === 2 ? 1 : 0,
      );
      const movingPieces = pieces
        .filter((piece) => piece.coordinate[axisIndex] === layer)
        .map((piece) => {
          const object = pieceRefs.current.get(piece.id);
          return object
            ? {
                piece,
                object,
                startPosition: object.position.clone(),
                startQuaternion: object.quaternion.clone(),
              }
            : null;
        })
        .filter(Boolean);

      if (movingPieces.length === 9) {
        turn = {
          active: true,
          previousMove: moveKey,
          startedAt: elapsed,
          duration: 1.25,
          angle: direction * Math.PI * 0.5,
          axis,
          movingPieces,
        };
        turnRef.current = turn;
      }
    }

    if (!turn.active) return;

    const progress = Math.min((elapsed - turn.startedAt) / turn.duration, 1);
    const eased = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    const rotation = new THREE.Quaternion().setFromAxisAngle(
      turn.axis,
      turn.angle * eased,
    );

    turn.movingPieces.forEach(
      ({ object, startPosition, startQuaternion }) => {
        object.position.copy(startPosition).applyQuaternion(rotation);
        object.quaternion.copy(rotation).multiply(startQuaternion);
      },
    );

    if (progress === 1) {
      turn.movingPieces.forEach(({ piece, object }) => {
        piece.coordinate = object.position
          .clone()
          .divideScalar(spacing)
          .toArray()
          .map(Math.round);
        object.position.set(
          piece.coordinate[0] * spacing,
          piece.coordinate[1] * spacing,
          piece.coordinate[2] * spacing,
        );
        object.quaternion
          .set(
            Math.round(object.quaternion.x * 1e10) / 1e10,
            Math.round(object.quaternion.y * 1e10) / 1e10,
            Math.round(object.quaternion.z * 1e10) / 1e10,
            Math.round(object.quaternion.w * 1e10) / 1e10,
          )
          .normalize();
      });

      turnRef.current = {
        active: false,
        previousMove: turn.previousMove,
      };
    }
  });

  return (
    <group ref={groupRef} scale={size} rotation={[-0.38, 0.62, 0.08]}>
      {pieces.map((piece) => (
        <group
          key={piece.id}
          ref={(node) => {
            if (node) pieceRefs.current.set(piece.id, node);
            else pieceRefs.current.delete(piece.id);
          }}
          position={piece.position}
        >
          <CubePiece
            position={[0, 0, 0]}
            pieceSize={pieceSize}
            materialType={piece.materialType}
            surfaceType={piece.surfaceType}
            surfaceDirection={piece.surfaceDirection}
            emissive={piece.emissive}
          />
        </group>
      ))}
    </group>
  );
}

function CubeGroup({
  size = 1,
  autoRotate = true,
  autoRotateSpeed = 0.16,
  floating = true,
}) {
  const pieceSize = 0.86;
  const spacing = 0.95;
  const cube = (
    <AnimatedCube
      size={size}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      pieceSize={pieceSize}
      spacing={spacing}
    />
  );

  if (!floating) return cube;

  return (
    <Float
      speed={1.25}
      rotationIntensity={0.1}
      floatIntensity={0.32}
      floatingRange={[-0.12, 0.12]}
    >
      {cube}
    </Float>
  );
}

export default memo(CubeGroup);
