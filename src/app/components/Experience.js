import { OrbitControls, Plane } from "@react-three/drei";
import React from "react";

import { Avatar } from "./Avatar";

const Experience = ({ page }) => {
  // Define the custom material properties
  const width = 30;
  const height = 10;

  return (
    <>
      {/* <OrbitControls /> */}
      <ambientLight />
      <directionalLight
        position={[-5, 5, 5]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <group position={[-0.05, -0.7, 0.2]}>
        <Avatar page={page} />
      </group>
      <mesh
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[1, -1, 2]}
        receiveShadow
      >
        <Plane args={[width, height]}>
          <meshBasicMaterial />
        </Plane>
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};

export default Experience;
