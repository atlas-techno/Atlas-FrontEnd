import { useState, useEffect } from "react";
import Header from "../Components/Header"
import "../Assets/Css/MainPage.css"
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
//import UserPool from "../Utils/UserPool";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { parseJwt } from "../Services/auth";
import config from "../Utils/config.json";


Modal.setAppElement('#root')

export default function MainPage() {

    const location = useLocation();
    const [listworkspaces, setListworkspaces] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [nomeWS, setNomeWS] = useState("")
    const [regionWS, setRegionWS] = useState("us-east-1")

    const [idWorkspace, setIdWorkspace] = useState("")
    const navigate = useNavigate()

    const currentUser =  (parseJwt(sessionStorage.getItem('idToken')).name).trim()
    
    console.log("CurrentUser: " + currentUser.trim())
    function OpenModal() {
        setModalIsOpen(true)

    }

    function CloseModal() {
        setModalIsOpen(false)
    }

    function GoWS(WK) {
        console.log(WK)
        navigate("workspace", { state: { name: WK.name, region: WK.region, id: WK._id } })
    }


    function ListWorkspaces(){
        axios(config.apiEndpoint+currentUser+"/query_workspaces")
        .then((r) => {
            console.log(r)
            setListworkspaces(r.data)
        })
        .catch((err)=>{
            console.error(err)
        })
    }

    function CreateWS(e) {
        e.preventDefault()
        axios.post(config.apiEndpoint+ currentUser +"/create_workspace",{
            "name" : nomeWS,
            "region" : regionWS
        } ).then((r) => {
            console.log(r)
            toast.success("Sua workspace foi cadastrada com sucesso!")
            ListWorkspaces()

            setModalIsOpen(false)

        }).catch((err) => {
            console.error(err)
        })
        setModalIsOpen(false)
        console.log(nomeWS)
        console.log(regionWS) 
    }

    useEffect(() => {
        ListWorkspaces()
    }, [])

    return (
        <>
            <Header />
            <main className="MainBG">
                <div className="containerBtnCreate">

                    <button className="btnMain" onClick={OpenModal}><span>+</span> Adicionar Workspace</button>

                </div>
                <Modal
                    isOpen={modalIsOpen}

                    onRequestClose={CloseModal}
                    className="Content"
                    
                    overlayClassName="Overlay"
                    contentLabel="Example Modal"
                >
                    <form className="MainForms" onSubmit={CreateWS}>
                        <label >Nome Workspace</label>
                        <input className="InputMain"
                            value={nomeWS}
                            onChange={(e) => setNomeWS(e.target.value)}
                        />
                        <label >Região </label>
                        <select name="RegionsSelect" id="RegionSelec"
                            value={regionWS}
                            onChange={(e) => setRegionWS(e.target.value)}

                        >
                            <option value="us-east-1">US East (N. Virginia)</option>
                            <option value="us-east-2">US East (Ohio)</option>
                            <option value="sa-east-1">South America (São Paulo)</option>
                        </select>

                        <div className="containerBtnForm">
                            <button className="BtnFormMain" type="submit">Criar</button>

                        </div>


                    </form>
                </Modal>
                <div className="containerWrapper">

                    {
                        listworkspaces.length === 0 && <div className="boxListNull">

                            <p>Pelo visto você não tem workspaces cadastradas ainda. Clique no botao "<button className="btnMainN" disabled onClick={OpenModal}><span>+</span> Adicionar Workspace</button>" para cadastrar uma.</p>
                        </div>
                    }
                    {
                        listworkspaces.map((WK) => {

                            return (

                                <div onClick={() => GoWS(WK)} className="containerWS" key={WK._id}>

                                    <h2 id="h2Name">{WK.name}</h2>
                                    <span id="SpanRegion">{WK.region}</span>

                                </div>
                            )
                        })
                    }


                </div>

            </main>
            <ToastContainer />
        </>
    )
}