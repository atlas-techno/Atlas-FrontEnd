import React, { useState, useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Obj({ setIsDragging, floorPlane }) {
  const [pos, setPos] = useState([0, 1, 0]);

  let planeIntersectPoint = new THREE.Vector3();

  const dragObjectRef = useRef();

  const [spring, api] = useSpring(() => ({
    // position: [0, 0, 0],
    position: pos,
    scale: 1,
    rotation: [0, 0, 0]
    
  }));

  const bind = useDrag(
    ({ active,  timeStamp, event }) => {
      if (active) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        setPos([planeIntersectPoint.x, 1, planeIntersectPoint.z]);
      }

      setIsDragging(active);

      api.start({
        // position: active ? [x / aspect, -y / aspect, 0] : [0, 0, 0],
        position: pos,
        
        
      });
      return timeStamp;
    },
    
  );

  return (
    <animated.mesh {...spring} {...bind()} >
      <boxGeometry  
        ref={dragObjectRef}
        attach="geometry"
        args={[2, 2, 2]}
        
      />
      <meshBasicMaterial color={"white"}  attach="material"/>
      
    </animated.mesh>
  );
}

export default Obj;
