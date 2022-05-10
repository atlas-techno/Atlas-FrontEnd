import Header from "../Components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import "../Assets/Css/WorkspaceStryle.css";
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import Ec2Icon from "../Assets/img/Ec2Icon.svg";
import axios from 'axios';
import '../Assets/Css/Form.css';
import UserPool from "../Utils/UserPool";



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
        width: '30%',
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
    const navigate = useNavigate()
    const location = useLocation()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modal2IsOpen, setModa2lIsOpen] = useState(false)
    const [modal3IsOpen, setModa3lIsOpen] = useState(false)
    const [vpc, setVpc] = useState({
        vpc_name: '',
        cidr_block: 0
    })
    const [ec2, setEc2] = useState({
        resource_name: '',
        ami: 'ami-04505e74c0741db8d',
        type: 't2.nano',
        count: 1,
        tag_name: '',
        delete_on_termination: false,
        vpc: ''
    }
    );


    
    
    const [loading, setLoading] = useState(false)
    const [loadingD, setLoadingD] = useState(true)
    const [loadingDe, setLoadingDe] = useState(true)
    const [wsName, setWsName] = useState(location.state.name)
    const [wsRegion, setWsRegion] = useState(location.state.region)

    const [TandF, setTandF] = useState(false)
    const [isVpc, setIsVpc] = useState(false)

    const [listWS, setListWS] = useState([])


    const [listEc2, setListEc2] = useState([])



    function createEc2(event) {
        // setLoading(true)
        event.preventDefault()
        listEc2.push(ec2)

        ec2.delete_on_termination = TandF
        console.log(ec2)
        console.log(TandF)

        axios.post("http://api.atlas.senai.info/" + UserPool.getCurrentUser().getUsername() + "/" + wsName + "/create_ec2", ec2,)
            .then((r) => {
                console.log(r)
                setLoading(false)
                setLoadingDe(false)
            })
            .catch((erro) => {
                console.log(erro)
                setLoading(false)
            })

        console.log(listEc2)
        setModalIsOpen(false)
    }
    function createVpc(event) {
        // setLoading(true)
        event.preventDefault()
        listWS.push(vpc)


        console.log(vpc)

        // axios.post("http://api.atlas.senai.info/" + UserPool.getCurrentUser().getUsername() + "/" + wsName + "/create_vpc", vpc)
        //     .then((r) => {
        //         console.log(r)
        //         setLoading(false)
        //         setLoadingDe(false)
        //     })
        //     .catch((erro) => {
        //         console.log(erro)
        //         setLoading(false)
        //     })

        console.log(listWS)
        setModa3lIsOpen(false)
    }

    function deployEc2(event) {
        event.preventDefault()
        setLoadingDe(true)

        axios("http://api.atlas.senai.info/deploy")
            .then((r) => {
                console.log(r)
                setLoading(false)
                setLoadingD(false)
                setLoadingDe(false)

            })
            .catch((erro) => {
                console.log(erro)
                setLoadingD(false)
            })

    }

    function destoryEC2() {

        setLoading(true)

        setLoadingD(true)

        setListEc2([])
        setListWS([])



        // axios("http://api.atlas.senai.info/" + wsName + "/destroy")
        //     .then((r) => {
        //         console.log(r)
        //         setLoading(false)
        //         setLoadingDe(true)
        //     })
        //     .catch((erro) => {
        //         console.log(erro)
        //         setLoading(false)
        //     })

        navigate('/main')
    }


    function OpenModal() {
        setModalIsOpen(true)

    }

    function CloseModal() {
        setModalIsOpen(false)
    }
    function OpenModal2(e) {
        setModa2lIsOpen(true)
        console.log(e)

    }

    function CloseModal2() {
        setModa2lIsOpen(false)
    }
    function OpenModal3() {
        setModa3lIsOpen(true)

    }

    function Close3Modal() {
        setModa3lIsOpen(false)
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
                <h1>Name: {ec2.resource_name}</h1>
                <h1>ami: {ec2.ami}</h1>
                <h1>type: {ec2.type}</h1>
                <h1>{wsName}</h1>
                <h1>{wsRegion}</h1>


            </Modal>
            <Modal
                isOpen={modalIsOpen}

                onRequestClose={CloseModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <form className="Forms_P" onSubmit={createEc2}>
                    <div className='container_Form'>
                        <h1 className="h1_ec2">Ec2</h1>
                        <label htmlFor="ami_Sel" className='ami_Sel'>Resource Name</label>

                        <input
                            value={ec2.resource_name}
                            onChange={e => setEc2(prevState => ({
                                ...prevState,
                                resource_name: e.target.value
                            }))}
                            type="text" className='input_Name' />


                        <label htmlFor="ami_Sel" className='ami_Sel'>Name</label>

                        <input
                            value={ec2.tag_name}
                            onChange={e => setEc2(prevState => ({
                                ...prevState,
                                tag_name: e.target.value
                            }))}
                            type="text" className='input_Name' />

                        <label htmlFor="ami_Sel" className='ami_Sel'>Ami</label>

                        <select value={ec2.ami} className='sel' name="Ami" id="ami_Sel"
                            onChange={e => setEc2(prevState => ({
                                ...prevState,
                                ami: e.target.value
                            }))}>

                            <option className='opt' value="ami-04505e74c0741db8d">Ubuntu</option>
                            <option className='opt' value="ami-07d02ee1eeb0c996c">Debian</option>
                            <option className='opt' value="ami-0f9a92942448ac56f">Windows Server 2019</option>
                            <option className='opt' value="ami-0745142a642f5af3a">Windows Server 2012</option>
                        </select>


                        <label htmlFor="ami_Sel" className='ami_Sel'>Type</label>
                        <select value={ec2.type} className='sel' name="Ami" id="ami_Sel" onChange={e => setEc2(prevState => ({
                            ...prevState,
                            type: e.target.value

                        }))}>
                            <option className='opt' value="t2.nano">t2.Nano</option>
                            <option className='opt' value="t2.micro">t2.Micro</option>
                            <option className='opt' value="t2.small">t2.Small</option>
                            <option className='opt' value="t2.medium">t2.Medium</option>
                        </select>


                        <label htmlFor="ami_Sel" className='ami_Sel'>Count</label>
                        <select value={ec2.count} className='sel' name="Ami" id="ami_Sel" onChange={e => setEc2(prevState => ({
                            ...prevState,
                            count: e.target.value

                        }))}>
                            <option className='opt' value="1">1</option>
                            <option className='opt' value="2">2</option>
                            <option className='opt' value="3">3</option>
                        </select>

                        <label className="ami_Sel fontSize">Deletar Memoria apos a destruição?</label>
                        <label className="switch">
                            <input
                                type="checkbox"

                                value={TandF}

                                onChange={e => setTandF(e.target.checked)}


                            />
                            <span className="slider round"></span>



                        </label>

                        <label htmlFor="ami_Sel" className='ami_Sel'>Vpc</label>
                        <select value={ec2.vpc} className='sel' name="Ami" id="ami_Sel" onChange={e => setEc2(prevState => ({
                            ...prevState,
                            vpc: e.target.value

                        }))}>
                            {listWS.map((vpc) => {
                                return (
                                    <option key={vpc.vpc_name} value={vpc.vpc_name}>
                                        {vpc.vpc_name}
                                    </option>
                                );
                            })}
                            
                        </select>



                        {
                            loading === true && <button type='submit' disabled className="btn_FormD disable" >Create</button>
                        }

                        {
                            loading === false && <button type='submit' className="btn_Form " >Create</button>
                        }

                    </div>

                </form>
            </Modal>
            <Modal
                isOpen={modal3IsOpen}

                onRequestClose={Close3Modal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <form className="Forms_P" onSubmit={createVpc}>
                    <div className='container_Form'>
                        <h1 className="h1_ec2">Vpc</h1>
                        <label htmlFor="ami_Sel" className='ami_Sel'>Resource Name</label>

                        <input
                            value={vpc.vpc_name}
                            onChange={e => setVpc(prevState => ({
                                ...prevState,
                                vpc_name: e.target.value
                            }))}
                            type="text" className='input_Name'
                        />


                        <label htmlFor="ami_Sel" className='ami_Sel'>Cidr Block</label>
                        <select value={vpc.cidr_block} className='sel' name="Ami" id="ami_Sel" onChange={e => setVpc(prevState => ({
                            ...prevState,
                            cidr_block: e.target.value

                        }))}>
                            <option className='opt' value="0">0</option>
                            <option className='opt' value="1">1</option>
                            <option className='opt' value="2">2</option>
                        </select>

                        {
                            loading === true && <button type='submit' disabled className="btn_FormD disable" >Create</button>
                        }

                        {
                            loading === false && <button type='submit' className="btn_Form " >Create</button>
                        }

                    </div>

                </form>
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
                                        {listEc2.map((ec2) => {
                                            return (

                                                <div key={ec2.idEc2} value={ec2.resource_name} onClick={(e) => OpenModal2(e)} style={{ cursor: 'pointer' }} className="Ec2PlaceHolder">
                                                    <span >{ec2.resource_name}</span>
                                                    <img src={Ec2Icon} alt="Icon Ec2" />
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
                            <button className="BtnWK" onClick={() => OpenModal3()} ><span>+</span> Adicionar Vpc</button>


                        </div>


                        <div className="ContainerViewrButtons">
                            <button className="btn_Viewr" onClick={() => deployEc2()} >Deploy</button>
                            <button className="btn_Destory " onClick={() => destoryEC2()} >Destroy</button>
                        </div>

                        {/* <div className="Forms_V ">
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
                        </div> */}


                    </div>
                </div>
            </div>
        </>
    )
}