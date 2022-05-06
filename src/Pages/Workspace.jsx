import Header from "../Components/Header";
import { useLocation } from "react-router-dom";
import Grid from "../Components/Grid.jsx";
import "../Assets/Css/WorkspaceStryle.css";
import { useMemo } from "react";
import Ec2 from "../Components/Ec2";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Game } from "../Components/Game";
import Vpc from "../Components/Vpc";

export default function Workspace() {
    const location = useLocation()

    const game = useMemo(() => new Game(), [])
 
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
                                <Vpc/>

                            </div>

                            
                        </div>
                        
                        <Grid game={game} />

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