import React from 'react'
import GridSquare from './GridSquares'
import "../Assets/Css/Square.css";

// Represents a 10 x 18 grid of grid squares

export default function GridBoard(props) {

  // generates an array of 18 rows, each containing 10 GridSquares.

    const grid = []
    for (let row = 0; row < 1000; row ++) {
        grid.push([])
        for (let col = 0; col < 10; col ++) {
            grid[row].push(<GridSquare key={`${col}${row}`}/>)
        }
    }

  // The components generated in makeGrid are rendered in div.grid-board

    return (
        <div className='grid-board'>
            {grid}
        </div>
    )
}