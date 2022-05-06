import React from "react";
import Square from "../Components/SquareGrid";
import { useDrop } from "react-dnd";
import { ItemType } from "./Constants";
import {moveEc2} from "./Effect";


export default function SquareBoard({ x, y, children }) {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemType.EC2,
        hover(item) {
            console.log(item)
            console.log(children)
            
        },
        drop: () => moveEc2(x, y),
        collect: monitor => ({
            isOver: monitor.isOver(),
        }),
    }), [x, y])
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