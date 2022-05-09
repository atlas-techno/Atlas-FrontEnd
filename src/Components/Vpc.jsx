import "../Assets/Css/WorkspaceStryle.css";
import { useDrag  } from 'react-dnd'
import { ItemType } from "./Constants";
// import Modal from 'react-modal';




export default function Vpc({ props }) {
    
    const [, drag] = useDrag(() => ({
        type: ItemType.VPC,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()  
        })

    }),
        []
    )
    return (
        <div

            ref={drag}
            style={{
                cursor: 'move',

            }}

            className="VpcPlaceHolder">

            <span>+</span>
            <div>

                <span>Vpc</span>
            </div>
            

            
        </div>
    )
}
