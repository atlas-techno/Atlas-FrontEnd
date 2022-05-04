import { OrbitControls, OrthographicCamera, useAspect } from '@react-three/drei'
import "../Assets/Css/WorkspaceStryle.css";
// import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from "three";
import Obj from "./Obj";
import Workspace from "../Pages/Workspace.jsx";





export default function WorkspaceGrid() {
    // const [isDragging, setIsDragging] = useState(false);

    
    

    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  


    return (
        
        <>
        {/* <Canvas>
            <PerspectiveCamera makeDefault aspect={5} far={2}  >
            
            
            <gridHelper args={[50, 50]} />
                </PerspectiveCamera>
                
            </Canvas> */}
            <div style={{ width: "36vw", height: "98%" }}>
                {/* camera={{ fov: 40, position: [10, 10, 10] }} */}
                {/* orthographic camera={{ zoom: 30, position: [30, 30, 30] }} */}
                <Canvas orthographic camera={{ zoom: 40, position: [0, 5, 0] }}  >
                    <ambientLight />
                    {/* <OrbitControls/> */}
                    {/* <spotLight position={[10, 15, 10]} angle={0.3} /> */}
                    <gridHelper args={[17, 12]} />

                    
                    {/* <mesh
                        
                        rotation={[-Math.PI / 2, 0, 0]}
                        position={[0, -0.1, 0]}
                        
                        >
                        <planeBufferGeometry attach="geometry" args={[20, 20]} receiveShadow />
                        <meshPhongMaterial
                        attach="material"
                        color="#fff"
                        side={THREE.DoubleSide}
                        
                        />
                    </mesh> */}
                    {/* <planeHelper args={[floorPlane, 10, "yellow"]} /> */}
                    {/* <OrbitControls minZoom={10} maxZoom={50} enabled={!isDragging} /> */}
                    {/* <Obj setIsDragging={setIsDragging} floorPlane={floorPlane} /> */}
                </Canvas>
            </div>
            </>
            
            )
        }