import Header from "../Components/Header";
import { useLocation } from "react-router-dom";
import "../Assets/Css/WorkspaceStryle.css";
import {  useState } from "react";
import FormsEc2 from "../Components/FormsEc2";
import Modal from 'react-modal';
import Ec2Icon from "../Assets/img/Ec2Icon.svg";

Modal.setAppElement('#root')
const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.40)'

    },
    content: {
        width: '30%',
        height: '68%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',


        // borderRadius: '10px',
        backgroundColor: '#000',
        transform: 'translate(-50%, -50%)',

    },
};
const customStyles2 = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.30)'

    },
    content: {
        width: '100%',
        height: '30%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',

        border: '5px solid #000',

        // borderRadius: '10px',
        // backgroundColor: 'rgba(255, 255, 255, 1)',
        transform: 'translate(-50%, -50%)',
        backdropFilter: 'blur(6px)',
    },
};

export default function Workspace() {
    const location = useLocation()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modal2IsOpen, setModa2lIsOpen] = useState(false)
    const [ec2, setEc2] = useState({
        resource_name: '',
        ami: 'ami-04505e74c0741db8d',
        type: 't2.nano',
        count: 1,
        tag_name: '',
        delete_on_termination: false
    }
    );
    const [TandF, setTandF] = useState(false)
    const [isVpc, setIsVpc] = useState(false)

    const [listWS, setListWS] = useState([{
        id: 1,
        Ec2: [
            {
                idEc2: 2
            },
            {
                idEc2: 3
            }
        ]
    }])

    
    const [listEc2, setListEc2] = useState([{
        idEc2: 2
    },{
        idEc2: 3
    }])


    function OpenModal() {
        setModalIsOpen(true)

    }

    function CloseModal() {
        setModalIsOpen(false)
    }
    function OpenModal2() {
        setModa2lIsOpen(true)

    }

    function CloseModal2() {
        setModa2lIsOpen(false)
    }

    return (
        <>


            <Header />
            {/* <div className="ContainerTitle">
                <h1>{location.state.name}</h1>
                <h2>{location.state.region}</h2>

            </div> */}
            <Modal
                isOpen={modal2IsOpen}

                onRequestClose={CloseModal2}
                style={customStyles2}
                contentLabel="Example Modal"
            >
                {/* {
                    isVpc === true && <h1>Vpc</h1>
                 }
                {
                    isVpc === false && <h1>Ec2</h1>
                 } */}
                

            </Modal>
            <Modal
                isOpen={modalIsOpen}

                onRequestClose={CloseModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <FormsEc2 />
            </Modal>
            <div className="MainWK">

                <div className="containerNameWK">

                    <div className="ContainerTitle">
                        <h1>{location.state.name}</h1>
                        <h2>{location.state.region}</h2>

                    </div>



                </div>

                <div className="contWrapper">
                    <div className="listWS">

                        {listWS.map((elements) => {

                            return (

                                <div key={elements.id} className="EntireVpc">

                                    <div onClick={() => OpenModal2()} className="VpcPlaceHolder">
                                        <span>Vpc {elements.id}</span>
                                    </div>
                                    <div className="vpcblock">
                                        {listEc2.map((elements) => {
                                            return (

                                                <div key={elements.idEc2} style={{ cursor: 'pointer' }} className="Ec2PlaceHolder">
                                                    <img src={Ec2Icon} />
                                                </div>


                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}



                    </div>

                    <div className="containerManeger">

                        <div className="buttonEc2VPC">


                            <button className="BtnWK" onClick={() => OpenModal()} ><span>+</span> Adicionar Ec2</button>
                            <button className="BtnWK" ><span>+</span> Adicionar Vpc</button>


                        </div>


                        <div className="ContainerViewrButtons">
                            <button className="btn_Viewr" >Deploy</button>
                            <button className="btn_Destory " >Destroy</button>
                        </div>

                        <div className="Forms_V ">
                            <div className="ContainerViewr">
                                <div className="TerraformCode">
                                    <span>resource "aws_instance" "<span className="span_color">{ec2.resource_name}</span>" {'{'}</span>

                                    <span className="mfl">ami = <span className="span_color">{ec2.ami}</span></span>

                                    <span className="mfl">instance_type           = <span className="span_color">{ec2.type}</span></span>

                                    <span className="mfl">count                   = <span className="span_color">{ec2.count}</span></span>

                                    <span className="mfl">{'root_block_device {'}</span>

                                    {
                                        TandF === true && <span className="mfll">delete_on_termination = <span className="span_color">true</span></span>
                                    }

                                    {
                                        TandF === false && <span className="mfll">delete_on_termination = <span className="span_color">false</span></span>
                                    }

                                    < span className="mfl">{'}'}</span>

                                    <span className="mfl">{'tags = { '}</span>

                                    <span className="mfll">Name = "<span className="span_color">{ec2.tag_name}</span>"</span>

                                    <span className="mfl">{'}'}</span>

                                    <span>{'}'}</span>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}