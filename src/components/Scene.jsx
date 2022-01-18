import React, { useRef } from "react";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { softShadows, OrbitControls } from "@react-three/drei";

import PressStart2P from "../assets/PressStart2P.json";

softShadows();

const Text = () => {
  const mesh = useRef(null);
  const font = new THREE.FontLoader().parse(PressStart2P);
  const textOptions = {
    font,
    size: 0.7,
    height: 0.2,
  };

  return (
    <group ref={mesh}>
      <mesh
        position={[-6.2, 0, 0]}
        castShadow
        onClick={() => console.log("hi")}
      >
        <textGeometry attach="geometry" args={["Gaki Oni Gang", textOptions]} />
        <meshStandardMaterial attach="material" color={0xffffff} />
      </mesh>
    </group>
  );
};

export default function Scene1() {
  return (
    <>
      <Canvas
        style={{
          height: "100vh",
          width: "50vw",
          zIndex: 0,
        }}
        camera={{ position: [0, -1, 10] }}
        shadows
      >
        <ambientLight intensity={1} color={0xcccccc} />
        <directionalLight
          position={[0, 4, 10]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          castShadow
        />
        <group>
          <mesh
            // receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
          <Text />
        </group>
        <OrbitControls />
      </Canvas>
    </>
  );
}
