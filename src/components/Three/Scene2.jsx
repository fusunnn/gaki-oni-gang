import React, { Suspense, useRef } from "react";

import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { softShadows, OrbitControls } from "@react-three/drei";
import PressStart2P from "../../assets/PressStart2P.json";

softShadows();

const Text = ({ ...props }) => {
  const font = new THREE.FontLoader().parse(PressStart2P);
  const textOptions = {
    font,
    size: 0.7,
    height: 0.2,
  };

  return (
    <group>
      <mesh position={[-8, 5, 0]} castShadow>
        <textGeometry attach="geometry" args={["Roadmap", textOptions]} />
        <meshStandardMaterial attach="material" color={0xff0059} />
      </mesh>
    </group>
  );
};

const Step = ({ imgPath }) => {
  const [image] = useLoader(THREE.TextureLoader, [imgPath]);
  const font = new THREE.FontLoader().parse(PressStart2P);
  const titleTextOptions = {
    font,
    size: 0.5,
    height: 0.2,
  };
  const bodyTextOptions = {
    font,
    size: 0.3,
    height: 0.2,
  };
  return (
    <group>
      <mesh castShadow rotation={[0, -6, 0]}>
        <planeBufferGeometry attach="geometry" args={[4, 5]} />
        <meshBasicMaterial attach="material" map={image} />
      </mesh>
      <mesh position={[-7, 1.4, 0]} castShadow rotation={[0, -6, 0]}>
        <textGeometry attach="geometry" args={["Phase 1", titleTextOptions]} />
        <meshStandardMaterial attach="material" color={0xff0059} />
      </mesh>
      <mesh position={[-12.5, 0, 0]} castShadow rotation={[0, -6, 0]}>
        <textGeometry
          attach="geometry"
          args={["Initial Gaki Oni Release", bodyTextOptions]}
        />
        <meshStandardMaterial attach="material" color={0xff0059} />
      </mesh>
    </group>
  );
};

export default function Scene1({}) {
  return (
    <>
      <Canvas
        style={{
          height: "100vh",
          width: "100vw",
          zIndex: 0,
        }}
        camera={{ position: [0, 4, 10] }}
        shadows
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} color={0xcccccc} />
          <directionalLight
            position={[0, 10, -7]}
            intensity={0.4}
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
              receiveShadow
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -3, 0]}
            >
              <planeBufferGeometry attach="geometry" args={[100, 100]} />
              <shadowMaterial attach="material" opacity={0.3} />
            </mesh>
          </group>
          <Text />
          <group>
            <Step imgPath="sketch.jpg" />
          </group>
        </Suspense>
      </Canvas>
    </>
  );
}
