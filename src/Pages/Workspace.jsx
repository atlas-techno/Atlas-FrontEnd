import Header from "../Components/Header";
import { useLocation } from "react-router-dom";
import Canvas from "../Components/Canvas";

// import GridSquares from "../Components/GridSquares";
import GridBoard from "../Components/GridBoard";


export default function Workspace() {

    

    const location = useLocation()
    const draw = ctx => {
        for (let i = 0; i < 605; i=+6) {
              
            ctx.moveTo(i,5);
            ctx.lineTo(i,605);

            ctx.moveTo(5,i);
            ctx.lineTo(605,i);

            ctx.strokeStyle="#000000";
            ctx.stroke();
        }
       
      }

    

    return (
        <>


            <Header />
            <div >
                <Canvas draw={draw}/>
            {/* <GridBoard/> */}
                <h1>{location.state.name}</h1>
                <h2>{location.state.region}</h2>

            </div>
        </>
    )
}