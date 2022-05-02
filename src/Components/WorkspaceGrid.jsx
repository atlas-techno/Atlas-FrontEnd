// import { PerspectiveCamera } from '@react-three/drei'
import "../Assets/Css/WorkspaceStryle.css";
// import { createRoot } from 'react-dom/client'
import React, {useRef, useEffect} from 'react'
import { Canvas, useThree } from '@react-three/fiber'

import { OrbitControls } from "@react-three/drei";


export default function WorkspaceGrid() {

    

    return (
        <>
            {/* <Canvas>
                <PerspectiveCamera makeDefault aspect={5} far={2}  >


                    <gridHelper args={[50, 50]} />
                </PerspectiveCamera>

            </Canvas> */}
            <div style={{ width: "100vw", height: "80vh" }}>
            
                <Canvas camera={{position:[10, 10, 10]}} >
                    <OrbitControls />
                    {/* <ambientLight intensity={0.5} /> */}
                    <spotLight position={[10, 15, 10]} angle={0.3} />
                    <gridHelper args={[50, 50]} />
                </Canvas>
            </div>
        </>
    )
}