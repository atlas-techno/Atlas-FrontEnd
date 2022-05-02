import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from '@react-three/drei'
import "../Assets/Css/WorkspaceStryle.css";

export default function WorkspaceGrid() {

    return (
        <>
            
            <PerspectiveCamera makeDefault position={45, 100 / 2000, 1, 1000} >
            

                <gridHelper args={[50, 50]} />
            </PerspectiveCamera>
           
        </>
    )
}