import Header from "../Components/Header";
import { useLocation } from "react-router-dom";
import Grid from "../Components/WorkspaceGrid";
import "../Assets/Css/WorkspaceStryle.css";

// import GridSquares from "../Components/GridSquares";
// import GridBoard from "../Components/GridBoard";


export default function Workspace() {
    const location = useLocation()

    return (
        <>


            <Header />
            <body className="bodyWS">

                <div className="ContainerWSgrid">
                    <div className="boxPropsWS">
                        <div className="containerH1H2">

                            <h1>{location.state.name}</h1>
                            <h2>{location.state.region}</h2>
                        </div>
                    </div>
                    <Grid />

                </div>
            </body>
            {/* <div >
                
                <h1>{location.state.name}</h1>
                <h2>{location.state.region}</h2>

            </div> */}
        </>
    )
}