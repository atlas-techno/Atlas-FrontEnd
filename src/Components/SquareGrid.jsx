import React, { Children } from "react";
import "../Assets/Css/WorkspaceStryle.css";
import {  useDrop } from 'react-dnd'


export default function SquareGrid({children}) {

     

    return <div  className="SquareGrid">
        {children}
    </div>
}

