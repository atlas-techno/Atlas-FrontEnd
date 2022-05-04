import Header from "../Components/Header";
import { useLocation } from "react-router-dom";
import Grid from "../Components/WorkspaceGrid";
import "../Assets/Css/WorkspaceStryle.css";
import { useState } from "react";
import Ec2, {ItemType} from "../Components/Ec2";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// import { useDrag } from '@use-gesture/react'
// import { animated, useSpring } from "@react-spring/three";

// import GridSquares from "../Components/GridSquares";
// import GridBoard from "../Components/GridBoard";

export default function Workspace() {
    const [ec2, setEc2] = useState(false)
    const location = useLocation()

    // const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

    // const bind = useDrag(({ down, movement: [mx, my] }) => {
    //     api.start({ x: down ? mx : 0, y: down ? my : 0})
    //   })

    // function showEc2() {
    //     setEc2(true)
    // }

    

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
                            <Ec2/>
                            
                        </div>
                        
                        {
                            ec2 === true &&   <div className="containerec2"><h1>Ec21</h1></div>
                        }
                    </div>

                    {/* <animated.div  {...bind()} style={{ x, y}} /> */}


                    <Grid />

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