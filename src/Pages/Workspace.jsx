import Header from "../Components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import "../Assets/Css/WorkspaceStryle.css";
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import Ec2Icon from "../Assets/img/Ec2Icon.svg";
import axios from 'axios';
import '../Assets/Css/Form.css';
import UserPool from "../Utils/UserPool";
import CadAberto from "../Assets/img/lock-open-solid.svg";
import Cad from "../Assets/img/lock-solid.svg";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'



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
        zIndex: '4',

        // borderRadius: '10px',
        backgroundColor: '#000',
        transform: 'translate(-50%, -50%)',

    },
};
const ec2Form = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.40)'

    },
    content: {
        width: '30%',
        height: '73%',
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
        width: '40%',
        height: '40%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        padding: '3rem',
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
    const [modal4IsOpen, setModal4IsOpen] = useState(false)
    const [modalVpc, setModalVpc] = useState(false)
    const [modalSub, setModalSub] = useState(false)
    const [indexEc2, setIndexEc2] = useState(0)

    // const [element, setElement] = useState({
    //     idVpc: '',
    //     vpc_name: '',
    //     cidr_block: 0,
    //     subnets: [{
    //         idSub: '',
    //         vpc_name: '',
    //         cidr_block: 0,
    //         access: false,
    //         ec2s: [{
    //             resource_name: '',
    //             ami: '',
    //             type: '',
    //             count: 1,
    //             tag_name: '',
    //             delete_on_termination: false,

    //         }]
    //     }]
    // })
    const [vpc, setVpc] = useState({
        vpc_name: '',
        cidr_block: 0
    })
    const [subnet, setSubnet] = useState({
        idsub: "",
        vpc_name: "",
        cidr_block: 0,
        access: false
    })
    const [ec2, setEc2] = useState({
        resource_name: '',
        ami: 'ami-04505e74c0741db8d',
        type: 't2.nano',
        count: 1,
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
    const [listSubnet, setListSubnet] = useState([])



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
    function createSubnet(event) {
        // setLoading(true)
        event.preventDefault()
        listSubnet.push(subnet)
        subnet.access = TandF

        console.log(subnet)

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

        console.log(listSubnet)

        setModal4IsOpen(false)
        setTandF(false)
    }

    function deployEc2(event) {

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
        toast.success("Deploy feito com sucesso")

    }

    function destoryEC2() {

        setLoading(true)

        setLoadingD(true)

        setListEc2([])
        setListWS([])



        axios("http://api.atlas.senai.info/" + wsName + "/destroy")
            .then((r) => {
                console.log(r)
                setLoading(false)
                setLoadingDe(true)
            })
            .catch((erro) => {
                console.log(erro)
                setLoading(false)
            })

        navigate('/main')
    }


    function DeleteEc2() {
      
        listEc2.splice(indexEc2)
        setModa2lIsOpen(false)
    }


    function OpenVpc() {
        setModalVpc(true)

    }

    function CloseVpc() {
        setModalVpc(false)
    }
    function OpenSub() {
        setModalSub(true)

    }

    function CloseSub() {
        setModalSub(false)
    }
    function OpenModal() {
        setModalIsOpen(true)

    }

    function CloseModal() {
        setModalIsOpen(false)
    }
    function OpenModal2(e) {
        setModa2lIsOpen(true)
        setIndexEc2(e)


        console.log(listEc2)

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
    function OpenModal4() {
        setModal4IsOpen(true)

    }

    function CloseModal4() {
        setModal4IsOpen(false)
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
                <div className="containerModelEc2">

                    <h1>Name: {ec2.resource_name}</h1>
                    <h1>Ami: {ec2.ami}</h1>
                    <h1>Type: {ec2.type}</h1>
                    <h1>Count: {ec2.count}</h1>
                    <h1>Delete on Termination: {ec2.delete_on_termination ? "True" : "False"}</h1>

                    <button className="btn_Destory" onClick={()=>DeleteEc2()}>Excluir</button>
                </div>


            </Modal>
            <Modal
                isOpen={modalVpc}

                onRequestClose={CloseVpc}
                style={customStyles2}
                contentLabel="Example Modal"
            >
                <h1>Vpc Name: {vpc.vpc_name}</h1>
                <h1>Cidr_block: {vpc.cidr_block}</h1>
            </Modal>
            <Modal
                isOpen={modalSub}
                onRequestClose={CloseSub}
                style={customStyles2}
                contentLabel="Example Modal"
            >
                <h1>Vpc Name: {vpc.vpc_name}</h1>
                <h1>Cidr_block: {subnet.cidr_block}</h1>
                <h1>Acesso: {subnet.access ? <span>privado</span> : <span>publico</span>}</h1>
            </Modal>
            <Modal
                isOpen={modalIsOpen}

                onRequestClose={CloseModal}
                style={ec2Form}
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
            <Modal
                isOpen={modal4IsOpen}

                onRequestClose={CloseModal4}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <form className="Forms_P" onSubmit={createSubnet}>
                    <div className='container_Form'>
                        <h1 className="h1_ec2">Subnet</h1>
                        <label htmlFor="ami_Sel" className='ami_Sel'>Id</label>

                        <input
                            value={subnet.idsub}
                            onChange={e => setSubnet(prevState => ({
                                ...prevState,
                                idsub: e.target.value
                            }))}
                            type="text" className='input_Name'
                        />
                        <label htmlFor="ami_Sel" className='ami_Sel'>Vpc Name</label>
                        <select value={subnet.vpc_name} className='sel' name="Ami" id="ami_Sel" onChange={e => setSubnet(prevState => ({
                            ...prevState,
                            vpc_name: e.target.value

                        }))}>
                            {listWS.map((vpc) => {
                                return (
                                    <option key={vpc.vpc_name} value={subnet.vpc_name}>
                                        {vpc.vpc_name}
                                    </option>
                                );
                            })}

                        </select>


                        <label htmlFor="ami_Sel" className='ami_Sel'>Cidr Block</label>
                        <select value={subnet.cidr_block} className='sel' name="Ami" id="ami_Sel" onChange={e => setSubnet(prevState => ({
                            ...prevState,
                            cidr_block: e.target.value

                        }))}>
                            <option className='opt' value="0">0</option>
                            <option className='opt' value="1">1</option>
                            <option className='opt' value="2">2</option>
                        </select>

                        <label className="ami_Sel fontSize">Acesso</label>



                        <label className="switch">

                            <input
                                type="checkbox"

                                value={TandF}

                                onChange={e => setTandF(e.target.checked)}


                            />
                            <span className="slider round"></span>






                        </label>

                        {
                            TandF && <span className="private">privado</span>
                        }
                        {
                            !TandF && <span className="private">publico</span>
                        }



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

                        {listWS.map((elements, index) => {

                            return (

                                <div key={index} className="EntireVpc">

                                    <div onClick={() => OpenVpc()} className="VpcPlaceHolder">
                                        <span>Vpc </span>
                                    </div>
                                    <div className="vpcblock">
                                        {
                                            listSubnet.map((sub) => {

                                                let bC = {
                                                    borderColor: sub.access ? '#7646a6' : '#C285FF'
                                                };

                                                let bg = {
                                                    backgroundColor: sub.access ? '#7646a6' : '#C285FF'
                                                }
                                                return (
                                                    <div key={sub.idsub} className="entireSubnet">
                                                        <div onClick={() => OpenSub()} style={bg} className="Subnetblock">
                                                            <span>Subnet <img className="cadPrivate" src={sub.access ? Cad : CadAberto} alt="Icone de Cadeado aberto ou fechado" /> </span>
                                                        </div>
                                                        <div  style={bC} className="subnet">
                                                            {listEc2.map((ec2, index) =>
                                                            (
                                                                <div key={index} className="ContainerEc2Count">
                                                                    {
                                                                        ec2.count === "2" && <div className="Ec2PlaceHolder top2"></div>
                                                                    }
                                                                    {
                                                                        ec2.count === "3" && <div className="Ec2PlaceHolder top"></div>
                                                                    }
                                                                    {
                                                                        ec2.count === "3" && <div className="Ec2PlaceHolder top2"></div>
                                                                    }

                                                                    <div value={ec2.resource_name} onClick={() => OpenModal2(index)} style={{ cursor: 'pointer' }} className="Ec2PlaceHolder ">

                                                                        <img src={Ec2Icon} alt="Icon Ec2" />
                                                                    </div>

                                                                </div>

                                                            )
                                                            )}


                                                        </div>



                                                    </div>


                                                )
                                            })
                                        }



                                    </div>

                                </div>
                            )
                        })}



                    </div>

                    <div className="containerManeger">

                        <div className="buttonEc2VPC">


                            <button className="BtnWK" onClick={() => OpenModal3()} ><span>+</span> Adicionar Vpc</button>
                            <button className="BtnWK" onClick={() => OpenModal4()} ><span>+</span> Adicionar Subnet</button>
                            <button className="BtnWK" onClick={() => OpenModal()} ><span>+</span> Adicionar Ec2</button>

                            <div className="ContainerViewrButtons">
                                <button className="btn_Destory " onClick={() => destoryEC2()} >Destroy</button>
                                <button className="btn_Viewr" onClick={() => deployEc2()} >Deploy</button>
                            </div>

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
            <ToastContainer />
        </>
    )
}