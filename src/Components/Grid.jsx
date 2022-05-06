import React from "react";
import Ec2 from "../Components/Ec2";
import Vpc from "../Components/Vpc";
// import { Piece } from "./Element.jsx";
import SquareBoard from "./SquareBoard";
import { useEffect, useState } from "react";







export default function Grid({ game  }) {
    const [[ec2X, ec2Y], setec2Pos] = useState(game.ec2Position)
    const [[vpc2X, vpc2Y], setvpcPos] = useState(game.vpcPosition)
    // const [children, setChildren] = useState(Vpc)
    useEffect(() => game.observe(setec2Pos))

    const Piece = ({ isEc2 }) => (isEc2 ? <Ec2 /> : null)
    const PieceVpc = ({ isVpc }) => (isVpc ? <Vpc /> : null)

    function renderPiece(x, y, [ec2X, ec2Y]) {
        
        if (x === ec2X && y === ec2Y) {
            return <Ec2/>
        }
    }
    function renderVpc(x, y, [vpcX, vpcY]) {
        
        if (x === vpcX && y === vpcY) {
            return <Vpc/>
        }
    }

    function renderSquare(i) {
        const x = i % 15
        const y = Math.floor(i / 15)

        return (
            <div key={i} >
                <SquareBoard x={x} y={y} game={game}>

                    {renderVpc(x, y, [ec2X, ec2Y])}
                </SquareBoard>
            </div>
        )
    }
    const square = []
    for (let i = 0; i < 171; i++) {
        square.push(renderSquare(i))
    }

    return (
        <div className="Grid">
            {square}
        </div>
    )
}


