import Header from "../Components/Header";
import { useNavigate, useLocation, Link } from "react-router-dom";
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
import NotFound from "./notFound.jsx";


Modal.setAppElement('#root')
const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.40)'

    },
    content: {
        width: '30%',
        height: '46%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        zIndex: '4',

        borderRadius: '3rem',
        backgroundColor: '#fff',
        transform: 'translate(-50%, -50%)',

    },
};
const ec2Form = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.40)'

    },
    content: {
        width: '30%',
        height: '90%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',


        borderRadius: '30px',
        backgroundColor: '#fff',
        transform: 'translate(-50%, -50%)',

    },
};

const StyleEc2 = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.30)'

    },
    content: {
        width: '28%',
        height: '25%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        paddingLeft: '3rem',
        paddingBottom: '3rem',
        // paddingRight: '2rem',


        borderRadius: '10px',
        // backgroundColor: 'rgba(255, 255, 255, 1)',
        transform: 'translate(-50%, -50%)',
        backdropFilter: 'blur(6px)',
    },
};
const StyleSub = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.30)'

    },
    content: {
        width: '38%',
        height: '20%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        paddingLeft: '3rem',
        paddingBottom: '3rem',
        // paddingRight: '2rem',


        borderRadius: '10px',
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
    const [ec2PH, setEc2PH] = useState({})
    const [listkeys, setListkeys] = useState([])

    const [vpc, setVpc] = useState({
        resource_name: '',
        cidr_block: 0
    })
    const [subnet, setSubnet] = useState({
        vpc_id: "",
        resource_name: "",
        vpc_name: "",
        cidr_block: 0
    })
    const [ec2, setEc2] = useState({
        subnet_id: '',
        resource_name: '',
        ami: 'ami-04505e74c0741db8d',
        type: 't2.nano',
        count: 1,
        volume_size: 8,
        volume_type: 'gp2',
        delete_on_termination: false,
        subnet_name: '',
        key_name: ''
    }
    );


    const [keyph, setKeyph] = useState("")
    const [nomeVpcSub, setNomeVpcSub] = useState("")
    const [idnameVpc, setIdNameVpc] = useState("")
    const [loading, setLoading] = useState(false)
    const [loadingD, setLoadingD] = useState(true)
    const [loadingDe, setLoadingDe] = useState(true)
    // const [wsName, setWsName] = useState(location.state.name)
    // const [wsRegion, setWsRegion] = useState(location.state.region)

    const [TandF, setTandF] = useState(false)

    const [listWS, setListWS] = useState([])

    const [listEc2, setListEc2] = useState([])
    const [listSubnet, setListSubnet] = useState([])
    const [idWk, setIdWk] = useState(location.state.id)

    function ListKeys() {
        axios("http://localhost:8000/" + UserPool.getCurrentUser().getUsername() + "/query_ssh_keys")
            .then((r) => {
                console.log(r)
                setListkeys(r.data)

            }).catch((err) => { console.log(err) })
    }

    function createEc2(event) {
        // setLoading(true)
        event.preventDefault()

        if (listSubnet.length === 0) {
            toast.warn("Não ha nenhuma subnet cadastrada na Workspace")
            return
        }

        if (listSubnet.length > 0) {
            // ec2.subnet_name = subnet.resource_name
            // console.log(ec2) 
            console.log(keyph)
            var arrayslip = idnameVpc.split("_")
            ec2.subnet_id = arrayslip[0]
            ec2.subnet_name = arrayslip[1]
            ec2.delete_on_termination = TandF
            ec2.key_name = keyph
            console.log(ec2)
            // console.log(TandF)

            axios.post("http://localhost:8000/" + UserPool.getCurrentUser().getUsername() + "/" + idWk + "/create_ec2", ec2,)
                .then((r) => {
                    console.log(r)
                    setLoading(false)
                    setLoadingDe(false)
                    ListarEc2s()
                })
                .catch((erro) => {
                    console.log(erro)
                    setLoading(false)
                })


            // console.log(listEc2)
            setModalIsOpen(false)
        }
    }
    function createVpc() {
        console.log(vpc)
        if (vpc.name === "") {
            toast.warn("Cadastre um nome a sua Vpc")
        } else {
            axios.post("http://localhost:8000/" + UserPool.getCurrentUser().getUsername() + "/" + idWk + "/create_vpc", vpc)
                .then((r) => {
                    console.log(r)
                    setLoading(false)
                    setLoadingDe(false)
                    toast.success("Sua vpc foi cadastrada com sucesso!")
                    ListarVpcs()

                })
                .catch((erro) => {
                    console.log(erro)
                    console.log("Houve um erro ao cadastrar sua vpc")
                    setLoading(false)
                })

            console.log(listWS)
            setModa3lIsOpen(false)
        }

    }
    function createSubnet(event) {
        // setLoading(true)
        event.preventDefault()
        if (listWS.length === 0) {
            toast.warn("Não ha nenhuma vpc cadastrada na Workspace")

        }

        if (listWS.length > 0) {
            // subnet.access = TandF
            var idName = nomeVpcSub.split("_")
            console.log(idName[0])
            subnet.vpc_name = idName[1]
            subnet.vpc_id = idName[0]
            console.log(subnet.vpc_id)

            if (subnet.vpc_name === 0) {
                toast.warn("Selecione uma Vpc")

            } else {

                axios.post("http://localhost:8000/" + UserPool.getCurrentUser().getUsername() + "/" + idWk + "/create_subpub", subnet)
                    .then((r) => {
                        console.log(r)
                        setLoading(false)
                        setLoadingDe(false)
                        ListarSubs()
                    })
                    .catch((erro) => {
                        console.log(erro)
                        setLoading(false)
                        toast.warn("Selecione uma Vpc")
                    })
                setModal4IsOpen(false)
                setTandF(false)

            }
        }
    }

    function deployEc2(event) {

        setLoadingDe(true)
        console.log(subnet)

        axios("http://localhost:8000/" + UserPool.getCurrentUser().getUsername() + "/" + idWk + "/deploy")
            .then((r) => {
                console.log(r)
                setLoading(false)
                setLoadingD(false)
                toast.success("Seu Deploy esta sendo excedido com sucesso!")


            })
            .catch((erro) => {
                console.log(erro)
                setLoadingD(false)
            })
        setLoadingD(false)

    }

    function destoryEC2() {

        setLoading(true)

        setLoadingD(true)

        setListEc2([])
        setListWS([])



        axios("http://localhost:8000/" + UserPool.getCurrentUser().getUsername() + "/" + idWk + "/destroy")
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

    function OpenVpc(e) {
        setModalVpc(true)
        setEc2PH(e)


    }

    function CloseVpc() {
        setModalVpc(false)
    }
    function OpenSub(e) {
        setModalSub(true)
        setEc2PH(e)
        console.log(e)
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
        setEc2PH(e)
        console.log(ec2PH)




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

    function ListarVpcs() {
        axios("http://localhost:8000/" + idWk + "/query_vpcs")
            .then((r) => {
                console.log(r.data)
                setListWS(r.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    function ListarSubs() {

        axios("http://localhost:8000/" + idWk + "/query_subnets")
            .then((r) => {
                console.log(r)
                setListSubnet(r.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function ListarEc2s() {
        axios("http://localhost:8000/" + idWk + "/query_instances")
            .then((r) => {
                console.log(r.data)
                setListEc2(r.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        ListarVpcs()
        ListarEc2s()
        ListarSubs()
        ListKeys()
    }, [])

    return (
        <>


            <Header />

            <Modal
                isOpen={modal2IsOpen}

                onRequestClose={CloseModal2}
                className="ContentMEc2"

                overlayClassName="Overlay"
                contentLabel="Example Modal"
            >
                <div className="containerModelEc2">
                    <div className="CloseIcon">
                        <h1>Ec2 </h1> <span onClick={() => CloseModal2()}>X</span>
                    </div>
                    <div className="navNames">


                        <h1>Name: <span>{ec2PH.resource_name}</span></h1>
                        <h1>Ami: <span>{ec2PH.ami}</span></h1>
                        <h1>Type: <span>{ec2PH.type}</span></h1>
                        <h1>Count: <span>{ec2PH.count}</span></h1>
                        <h1>Size: <span>{ec2PH.volume_size} Gb</span></h1>
                        <h1>Volume Type: <span>{ec2PH.volume_type}</span></h1>
                        <h1>Delete on Termination: <span>{ec2PH.delete_on_termination ? "True" : "False"}</span></h1>

                    </div>
                    {/* <form action="" className="formSSHmodel">
                        <div className="containerSSH">



                            <label htmlFor="" style={{ color: "#46246D" }} className="ami_Sel ">Chave SSH</label>

                            <select value={ec2.key_name} className='sel' name="Ami" id="ami_Sel"
                                onChange={e => setEc2(prevState => ({
                                    ...prevState,
                                    key_name: e.target.value
                                }))}>
                                <option className='opt' value="MainKey">MainKey</option>

                            </select>

                        </div>
                        <div className="contKEY">
                            <span>Nao tem uma chave? </span>
                            <span onClick={() => navigate("/keys")} className="spanButton">Cadastre uma chave</span>
                        </div>

                    </form> */}
                    {/* <button className="btn_Destory" onClick={() => DeleteEc2()}>Excluir</button> */}
                </div>


            </Modal>
            <Modal
                isOpen={modalVpc}

                onRequestClose={CloseVpc}
                style={StyleEc2}
                contentLabel="Example Modal"
            >
                <div className="containerModelEc2">
                    <div className="CloseIconVpc">
                        <span onClick={() => CloseVpc()}>X</span>
                    </div>


                    <div className="navNamesVpc">

                        <h1>Vpc Name: <span>{ec2PH.resource_name}</span></h1>
                        <h1>Cidr Block: <span>{ec2PH.cidr_block}</span></h1>
                    </div>




                    {/* <button className="btn_Destory" onClick={() => DeleteVpc()}>Excluir</button> */}
                </div>

            </Modal>
            <Modal
                isOpen={modalSub}
                onRequestClose={CloseSub}
                style={StyleSub}
                contentLabel="Example Modal"
            >

                <div className="containerModelEc2">
                    <div className="CloseIconVpc">
                        <span onClick={() => CloseSub()}>X</span>
                    </div>


                    <div className="navNamesSub">


                        <h1>Subnet Name: <span>{ec2PH.resource_name}</span></h1>
                        <h1>Cidr Block: <span>{ec2PH.cidr_block}</span></h1>
                        {/* <h1>Acesso: <span>{subnet.access ? <span>privado</span> : <span>publico</span>}</span></h1> */}

                    </div>



                    {/* <button className="btn_Destory" onClick={() => DeleteSub()}>Excluir</button> */}
                </div>

            </Modal>
            <Modal
                isOpen={modalIsOpen}

                onRequestClose={CloseModal}
                style={ec2Form}


                overlayClassName="Overlay"
                contentLabel="Example Modal"
            >
                <form className="Forms_PEc2" onSubmit={createEc2}>
                    <div className='container_FormEc2'>
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
                        <label htmlFor="ami_Sel" className='ami_Sel'>Size</label>
                        <input
                            value={ec2.volume_size}
                            onChange={e => setEc2(prevState => ({
                                ...prevState,
                                volume_size: e.target.value
                            }))}
                            type="range" style={{ color: "white" }} className='input_range' min="4" max="16" step={2} />
                        <div className="rangeviewr">
                            <span  >{ec2.volume_size}</span>

                        </div>


                        <label htmlFor="ami_Sel" className='ami_Sel'>Volume Type</label>
                        <select value={ec2.volume_type} className='sel' name="Ami" id="ami_Sel" onChange={e => setEc2(prevState => ({
                            ...prevState,
                            volume_type: e.target.value

                        }))}>
                            <option className='opt' value="gp2">Gp2</option>
                            <option className='opt' value="gp3">Gp3</option>
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

                        <label htmlFor="key_sel" style={{ color: "#46246D" }} className="ami_Sel ">Chave SSH</label>

                        <select value={keyph} className='sel' name="Ami" id="key_sel" onChange={e => setKeyph(e.target.value)}>
                        <option className='opt' value="0">Selecione uma Key</option>
                                {
                                    listkeys.map((key) => {
                                        return(
                                            <option key={key._id} value={key.key_name}>{key.key_name}</option>
                                        );
                                    })
                                }
                            

                        </select>

                        <label htmlFor="ami_Sel" className='ami_Sel'>Subnet</label>
                        <select value={idnameVpc} className='sel' name="Ami" id="vpcEc2_sel" onChange={e => setIdNameVpc(e.target.value)}>

                            <option className='opt' value="0">Selecione uma Subnet</option>
                            {listSubnet.map((sub) => {
                                return (
                                    <option key={sub._id} value={sub._id + "_" + sub.resource_name}>
                                        {sub.resource_name}
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
                            value={vpc.resource_name}
                            onChange={e => setVpc(prevState => ({
                                ...prevState,
                                resource_name: e.target.value
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
                            loading === true && <button type="button" disabled className="btn_FormD disable" >Create</button>
                        }

                        {
                            loading === false && <button type="submit" className="btn_Form " >Create</button>
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
                        <label htmlFor="ami_Sel" className='ami_Sel'>Resource Name</label>

                        <input
                            value={subnet.resource_name}
                            onChange={e => setSubnet(prevState => ({
                                ...prevState,
                                resource_name: e.target.value
                            }))}
                            type="text" className='input_Name'
                        />
                        <label htmlFor="ami_Sel" className='ami_Sel'>Vpc Name</label>

                        <select value={nomeVpcSub} className='sel' id="nome_Sel" onChange={e => setNomeVpcSub(e.target.value)}>
                            <option value="0">selecione uma vpc</option>
                            {listWS.map((vpc) => {
                                return (
                                    <option key={vpc._id} value={vpc._id + "_" + vpc.resource_name}>
                                        {vpc.resource_name}
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
                <div className="wrapperMainHeader">


                    <div className="containerNameWK">

                        <div className="ContainerTitle">
                            <h1>{location.state.name}</h1>
                            <h2>{location.state.region}</h2>


                        </div>



                    </div>
                    <div className="containerManeger">

                        <div className="buttonEc2VPC">


                            <button className="BtnWK" onClick={() => OpenModal3()} ><span>+</span> Adicionar Vpc</button>
                            <button className="BtnWK" onClick={() => OpenModal4()} ><span>+</span> Adicionar Subnet</button>
                            <button className="BtnWK" onClick={() => OpenModal()} ><span>+</span> Adicionar Ec2</button>


                        </div>
                        <div className="ContainerViewrButtons">
                            {
                                loadingD === true && <button className="btn_Destory disable" disabled onClick={() => destoryEC2()} >Destroy</button>
                            }
                            {
                                loadingD === false && <button className="btn_Destory " onClick={() => destoryEC2()} >Destroy</button>
                            }
                            {
                                listWS.length === 0 && <button className="btn_ViewrNoHover disable" disabled onClick={() => deployEc2()} >Deploy</button>
                            }
                            {
                                listWS.length > 0 && <button className="btn_Viewr" onClick={() => deployEc2()} >Deploy</button>
                            }
                        </div>


                    </div>

                </div>
                <div className="contWrapper">

                    <div className="listWS">

                        {

                            listWS.length === 0 && <div className="dialogue"><p>Você precisa criar no mínimo de uma Vpc para efetuar o deploy</p></div>

                        }


                        {listWS.map((elements) => {

                            return (

                                <div key={vpc._id} className="EntireVpc">

                                    <div onClick={() => OpenVpc(elements)} className="VpcPlaceHolder">
                                        <span>Vpc </span>
                                    </div>
                                    <div className="vpcblock">
                                        {
                                            listSubnet.filter((sub) => sub.vpc_id === elements._id).map((sub, index) => {

                                                // let bC = {
                                                //     borderColor: sub.access ? '#7646a6' : '#C285FF'
                                                // };

                                                // let bg = {
                                                //     backgroundColor: sub.access ? '#7646a6' : '#C285FF'
                                                // }
                                                return (
                                                    <div key={sub._id} className="entireSubnet">
                                                        <div onClick={() => OpenSub(sub)} className="Subnetblock">
                                                            <span>Subnet <img className="cadPrivate" src={sub.access ? Cad : CadAberto} alt="Icone de Cadeado aberto ou fechado" /> </span>
                                                        </div>
                                                        <div className="subnet">
                                                            {listEc2.filter((e) => e.subnet_id === sub._id).map((ec2) =>
                                                            (
                                                                <div key={ec2._id} className="ContainerEc2Count">
                                                                    {
                                                                        ec2.count === "2" && <div className="Ec2PlaceHolder top2"></div>
                                                                    }
                                                                    {
                                                                        ec2.count === "3" && <div className="Ec2PlaceHolder top"></div>
                                                                    }
                                                                    {
                                                                        ec2.count === "3" && <div className="Ec2PlaceHolder top2"></div>
                                                                    }

                                                                    <div value={ec2.resource_name} onClick={() => OpenModal2(ec2)} style={{ cursor: 'pointer' }} className="Ec2PlaceHolder ">

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


                </div>
            </div>
            <ToastContainer />
        </>
    )


}