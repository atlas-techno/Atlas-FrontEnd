import React from "react";
import Square from "../Components/SquareGrid";
import { useDrop } from "react-dnd";
import { ItemType } from "./Constants";
import { useEffect } from "react";


export default function SquareBoard({ x, y, children, game }) {

    


    const [{isDropped,isOver }, drop] = useDrop(() => ({
        accept: ItemType.EC2 && ItemType.VPC,
        drop(_item,monitor){
            const didDrop = monitor.didDrop()
            
            game.movevpc(x, y)
            
            return didDrop
        }, 
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            isDropped: monitor.didDrop()
        }),
    }), [game])

    
    
   

    return (
        <div
            ref={drop}
            
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >

            <Square>{children}</Square>
            {isOver && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 1,
                        opacity: 0.5,
                        backgroundColor: '#844FBA',
                    }}
                />
            )}
        </div>


    )

}