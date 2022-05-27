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
        height: '85%',
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
        height: '50%',
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
const StyleEc2 = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.30)'

    },
    content: {
        width: '40%',
        height: '35%',
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
        width: '40%',
        height: '35%',
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
        resource_name: '',
        cidr_block: 0
    })
    const [subnet, setSubnet] = useState({
        resource_name: "",
        vpc_name: "Teste",
        cidr_block: 0
    })
    const [ec2, setEc2] = useState({
        resource_name: '',
        ami: 'ami-04505e74c0741db8d',
        type: 't2.nano',
        count: 1,
        volume_size: 4,
        volume_type: 'gp2',
        delete_on_termination: false,
        subnet_name: ''
    }
    );

    const [nomeVpcSub, setNomeVpcSub] = useState("")




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

        if (listSubnet.length === 0) {
            toast.warn("Não ha nenhuma subnet cadastrado na Workspace")
            return
        }

        if (listSubnet.length > 0) {
            // ec2.subnet_name = subnet.resource_name
            // console.log(ec2)

            ec2.delete_on_termination = TandF
            console.log(ec2)
            // console.log(TandF)

            axios.post("http://192.168.5.22:8000/" + UserPool.getCurrentUser().getUsername() + "/" + wsName + "/create_ec2", ec2,)
                .then((r) => {
                    console.log(r)
                    setLoading(false)
                    setLoadingDe(false)
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
        // axios.post("https://api.atlas.senai.info/" + "oi"+ "/" + "oi" + "/create_vpc", vpc)
        axios.post("http://192.168.5.22:8000/" + UserPool.getCurrentUser().getUsername() + "/" + wsName + "/create_vpc", vpc)
            .then((r) => {
                console.log(r)
                setLoading(false)
                setLoadingDe(false)
                ListarVpcs()

            })
            .catch((erro) => {
                console.log(erro)
                setLoading(false)
            })

        console.log(listWS)
        setModa3lIsOpen(false)
    }
    function createSubnet(event) {
        // setLoading(true)
        event.preventDefault()
        if (listWS.length === 0) {
            toast.warn("Não ha nenhuma vpc cadastrado na Workspace")
            return
        }

        if (listWS.length > 0) {
            // subnet.access = TandF
            console.log(subnet)
            // subnet.vpc_name = nomeVpcSub

            // console.log(subnet)

            axios.post("http://192.168.5.22:8000/" + UserPool.getCurrentUser().getUsername() + "/" + wsName + "/create_subpub", subnet)
                .then((r) => {
                    console.log(r)
                    setLoading(false)
                    setLoadingDe(false)
                    ListarSubs()
                })
                .catch((erro) => {
                    console.log(erro)
                    setLoading(false)
                })
            // console.log(subnet)
            // console.log(listSubnet)
            setModal4IsOpen(false)
            setTandF(false)

        }
    }

    function deployEc2(event) {

        setLoadingDe(true)

        axios("http://192.168.5.22:8000/" + UserPool.getCurrentUser().getUsername() + "/" + wsName + "/deploy")
            .then((r) => {
                console.log(r)
                setLoading(false)
                setLoadingD(false)
                toast.success("Deploy feito com sucesso")


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



        axios("http://192.168.5.22:8000/" + UserPool.getCurrentUser().getUsername() + "/" + wsName + "/destroy")
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

    function DeleteVpc() {

        listWS.splice(indexEc2, 1)
        setListEc2([])
        setListSubnet([])
        setModalVpc(false)
    }

    function DeleteSub() {
        listSubnet.splice(indexEc2, 1)
        setListEc2([])
        setModalSub(false)
    }

    function DeleteEc2() {
        console.log(indexEc2)
        listEc2.splice(indexEc2, 1)
        setModa2lIsOpen(false)
    }


    function OpenVpc(e) {
        setModalVpc(true)
        setIndexEc2(e)


    }

    function CloseVpc() {
        setModalVpc(false)
    }
    function OpenSub(e) {
        setModalSub(true)
        setIndexEc2(e)
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
        setIndexEc2(e)
        console.log(indexEc2)

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

    function ListarVpcs() {
        axios("http://192.168.5.22:8000/" + UserPool.getCurrentUser().getUsername() + "/" + wsName + "/query_vpcs")
            .then((r) => {
                console.log(r.data)
                setListWS(r.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        ListarVpcs()
        ListarEc2s()
        ListarSubs()
    }, [])



    function ListarSubs() {

        axios("http://192.168.5.22:8000/" + UserPool.getCurrentUser().getUsername() + "/" + wsName + "/" + "Teste" + "/query_subnets")
            .then((r) => {
                console.log(r)
                setListSubnet(r.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // useEffect(() => {
    //     console.log(listWS)
    //     ListarSubs()

    // }, [listWS])
    function ListarEc2s() {
        axios("http://192.168.5.22:8000/" + UserPool.getCurrentUser().getUsername() + "/" + wsName + "/" + "Teste" + "/" + "testeSub1" + "/query_instances")
            .then((r) => {
                console.log(r.data)
                setListEc2(r.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }


    // useEffect(() => {
    //     
    //     ListarEc2s()
    // }, [wsName, ec2.subnet_name, subnet.vpc_name])

    // http://192.168.5.22:8000/
    return (
        <>


            <Header />

            <Modal
                isOpen={modal2IsOpen}

                onRequestClose={CloseModal2}
                style={customStyles2}
                contentLabel="Example Modal"
            >
                <div className="containerModelEc2">
                    <div className="CloseIcon">
                        <h1>Ec2 <span>{indexEc2 + 1}</span></h1> <span onClick={() => CloseModal2()}>X</span>
                    </div>
                    <div className="navNames">


                        <h1>Name: <span>{ec2.resource_name}</span></h1>
                        <h1>Ami: <span>{ec2.ami}</span></h1>
                        <h1>Type: <span>{ec2.type}</span></h1>
                        <h1>Count: <span>{ec2.count}</span></h1>
                        <h1>Size: <span>{ec2.volume_size} Gb</span></h1>
                        <h1>Volume Type: <span>{ec2.volume_type}</span></h1>
                        <h1>Delete on Termination: <span>{ec2.delete_on_termination ? "True" : "False"}</span></h1>

                    </div>
                    <button className="btn_Destory" onClick={() => DeleteEc2()}>Excluir</button>
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

                        <h1>Vpc Name: <span>{listWS.length > 0 && listWS[indexEc2].name}</span></h1>
                                    <h1>Cidr Block: <span>{listWS.length > 0 && listWS[indexEc2].cidr_block}</span></h1>
                    </div>




                    <button className="btn_Destory" onClick={() => DeleteVpc()}>Excluir</button>
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


                        <h1>Resource Name: <span>{subnet.resource_name}</span></h1>
                        <h1>Cidr Block: <span>{subnet.cidr_block}</span></h1>
                        {/* <h1>Acesso: <span>{subnet.access ? <span>privado</span> : <span>publico</span>}</span></h1> */}

                    </div>



                    <button className="btn_Destory" onClick={() => DeleteSub()}>Excluir</button>
                </div>

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
                        <label htmlFor="ami_Sel" className='ami_Sel'>Size</label>
                        <input
                            value={ec2.volume_size}
                            onChange={e => setEc2(prevState => ({
                                ...prevState,
                                volume_size: e.target.value
                            }))}
                            type="range" style={{ color: "white" }} className='input_Name' min="4" max="16" />
                        <span style={{ color: "white" }}>{ec2.volume_size}</span>


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

                        <label htmlFor="ami_Sel" className='ami_Sel'>Subnet</label>
                        {/* <select value={ec2.subnet_name} className='sel' name="Ami" id="ami_Sel" onChange={e => setEc2(prevState => ({
                            ...prevState,
                            subnet_name: e.target.value

                        }))}>

                            <option className='opt' value="testeSub1">testeSub1</option>
                            {listSubnet.map((sub, index) => {
                                return (
                                    <option key={index} value={sub.resource_name}>
                                        {sub.resource_name}
                                    </option>
                                );
                            })}

                        </select> */}

                        <input
                            value={ec2.subnet_name}
                            onChange={e => setEc2(prevState => ({
                                ...prevState,
                                subnet_name: e.target.value
                            }))}
                            type="text" className='input_Name' />



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
                            loading === true && <button type='button' disabled className="btn_FormD disable" >Create</button>
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

                        {/* e => setSubnet(prevState => ({
                            ...prevState,
                            vpc_name: e.target.value

                        }) */}

                        {/* listWS.length != null && */}
                        {/* <select value={nomeVpcSub} className='sel' id="ami_Sel" onChange={e => setNomeVpcSub(e.target.value)}>

                            <option  value="Teste">
                                Teste
                            </option>
                            {listWS.map((vpc, index) => {
                                return (
                                    <option key={index} value={vpc.name}>
                                        {vpc.name}
                                    </option>
                                );
                            })}

                        </select> */}

                        <input
                            value={subnet.vpc_name}
                            onChange={e => setSubnet(prevState => ({
                                ...prevState,
                                vpc_name: e.target.value
                            }))}
                            type="text" className='input_Name'
                        />


                        <label htmlFor="ami_Sel" className='ami_Sel'>Cidr Block</label>
                        <select value={subnet.cidr_block} className='sel' name="Ami" id="ami_Sel" onChange={e => setSubnet(prevState => ({
                            ...prevState,
                            cidr_block: e.target.value

                        }))}>
                            <option className='opt' value="0">0</option>
                            <option className='opt' value="1">1</option>
                            <option className='opt' value="2">2</option>
                        </select>

                        {/* <label className="ami_Sel fontSize">Acesso</label>



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
                        } */}



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

                                    <div onClick={() => OpenVpc(index)} className="VpcPlaceHolder">
                                        <span>Vpc </span>
                                    </div>
                                    <div className="vpcblock">
                                        {
                                            listSubnet.map((sub, index) => {

                                                // let bC = {
                                                //     borderColor: sub.access ? '#7646a6' : '#C285FF'
                                                // };

                                                // let bg = {
                                                //     backgroundColor: sub.access ? '#7646a6' : '#C285FF'
                                                // }
                                                return (
                                                    <div key={index} className="entireSubnet">
                                                        <div onClick={() => OpenSub(index)} className="Subnetblock">
                                                            <span>Subnet <img className="cadPrivate" src={sub.access ? Cad : CadAberto} alt="Icone de Cadeado aberto ou fechado" /> </span>
                                                        </div>
                                                        <div className="subnet">
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
                        {

                            listWS.length === 0 && <div className="display"><div className="dialogue"><p>Voce Precisa criar no minimo uma Vpc para efetuar o deploy</p></div> </div>

                        }



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