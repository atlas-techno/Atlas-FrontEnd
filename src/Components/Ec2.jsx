import "../Assets/Css/WorkspaceStryle.css";
import { useDrag, useDrop } from 'react-dnd'
import { ItemType } from "./Constants";

import { useRef } from "react";



export default function Ec2({data}) {
    

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemType.EC2,
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      }))

      

    
    
    return (
        <>
            <div
              onClick={() => console.log("OIOIOIOI")}
                id={Math.floor(Math.random())}
                ref={drag}
                
                style={{
                  opacity: isDragging ? 0.5 : 1,
                  
                  
                  cursor: 'move',
                }}
            
            className="Ec2PlaceHolder">
                <span>Ec2</span>
            </div>
        </>
    )
}