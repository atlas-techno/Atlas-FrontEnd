import React from "react";
import Ec2 from "../Components/Ec2";
import Square from "../Components/SquareGrid";
import { moveEc2 } from "./Effect";
import { ItemType } from "./Constants";
import { useDrop } from "react-dnd";
import SquareBoard from "./SquareBoard";
import game from "./Effect";




function renderSquare(i, ec2Position) {
    const x = i % 8
    const y = Math.floor(i / 8)

    return (
        <div key={i} >
            <SquareBoard x={x} y={y}>

                {renderPiece(x, y, ec2Position)}
            </SquareBoard>
        </div>
    )
}

function renderPiece(x, y, [ec2X, ec2Y]) {
    if (x === ec2X && y === ec2Y) {
        return <Ec2 />
    }
}




export default function Grid({ ec2Position }) {
    

        const square = []
        for (let i = 0; i < 64; i++) {
            square.push(renderSquare(i, ec2Position))
        }

        return (
            <div className="Grid">
                {square}
            </div>
        )
    }