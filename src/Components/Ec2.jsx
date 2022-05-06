import "../Assets/Css/WorkspaceStryle.css";
import { useDrag } from 'react-dnd'
import { ItemType } from "./Constants";
import Modal from 'react-modal';
import { useState } from "react";




export default function Ec2() {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [, drag] = useDrag(() => ({
    type: ItemType.EC2,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })

  }),
    []
  )

  function OpenModal() {
    setModalIsOpen(true)
    
}

function CloseModal() {
    setModalIsOpen(false)
}

  return (
    <>
      <div
        onClick={() => OpenModal()}
        ref={drag}
        style={{
          cursor: 'move',

        }}

        className="Ec2PlaceHolder">
        <div>

          <span>Ec2</span>
        </div>
      </div>
    </>
  )
}