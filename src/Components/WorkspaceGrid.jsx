import { OrbitControls, OrthographicCamera, useAspect } from '@react-three/drei'
import "../Assets/Css/WorkspaceStryle.css";
// import { createRoot } from 'react-dom/client'
import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'



export default function WorkspaceGrid() {

    function Box(props) {
        const mesh = useRef();
        // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
        return (
           <mesh {...props} ref={mesh}>
               {/* <DragEvent /> */}
              <boxGeometry  args={[1.62, 1.62, 1.62]} />
              <meshStandardMaterial  color={"orange"} />
           </mesh>
        );
     }
    

    return (
        <>
            {/* <Canvas>
                <PerspectiveCamera makeDefault aspect={5} far={2}  >


                    <gridHelper args={[50, 50]} />
                </PerspectiveCamera>

            </Canvas> */}
            <div style={{ width: "50vw", height: "100%"}}>
                {/* camera={{ fov: 40, position: [10, 10, 10] }} */}
                <Canvas orthographic camera={{ zoom: 30, position: [30, 30, 30] }} >

                        {/* <OrbitControls/> */}
                        <spotLight position={[10, 15, 10]} angle={0.3} />
                        <gridHelper args={[20, 12]} />
                        
                        <OrbitControls/>
                        <Box  position={[1,1,1]}/>
                </Canvas>
            </div>
        </>
    )
}