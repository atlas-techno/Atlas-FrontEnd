import Header from "../Components/Header";
import { useLocation } from "react-router-dom";
import Grid from "../Components/Grid.jsx";
import "../Assets/Css/WorkspaceStryle.css";
import { useState } from "react";
import Ec2, { ItemType } from "../Components/Ec2";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { observe } from "../Components/Effect";
import { createRoot } from 'react-dom/client'


// import { useDrag } from '@use-gesture/react'
// import { animated, useSpring } from "@react-spring/three";

// import GridSquares from "../Components/GridSquares";
// import GridBoard from "../Components/GridBoard";

export default function Workspace() {
    const [ec2, setEc2] = useState(false)
    const location = useLocation()


    

    let ec2Position = [0, 0]
 
    return (
        <>


            <Header />
            <DndProvider backend={HTML5Backend}>
                <body className="bodyWS">

                    <div className="ContainerWSgrid">
                        <div className="boxPropsWS">
                            <div className="containerH1H2">

                                <h1>{location.state.name}</h1>
                                <h2>{location.state.region}</h2>

                            </div>
                            <div className="containerDrag">
                                <Ec2 />

                            </div>

                            {
                                ec2 === true && <div className="containerec2"><h1>Ec21</h1></div>
                            }
                        </div>
                        
                        <Grid ec2Position={ec2Position} />

                    </div>
                </body>
            </DndProvider>
            {/* <div >
                
                <h1>{location.state.name}</h1>
                <h2>{location.state.region}</h2>

            </div> */}
        </>
    )
}