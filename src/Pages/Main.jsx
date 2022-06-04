import { useState, useEffect } from "react";
import Header from "../Components/Header"
import "../Assets/Css/MainPage.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import UserPool from "../Utils/UserPool";



Modal.setAppElement('#root')

export default function MainPage() {


    const [listworkspaces, setListworkspaces] = useState([{}])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [nomeWS, setNomeWS] = useState("")
    const [regionWS, setRegionWS] = useState("us-east-1")

    const [idWorkspace, setIdWorkspace] = useState("")
    const navigate = useNavigate()
    
    

    function OpenModal() {
        setModalIsOpen(true)

    }

    function CloseModal() {
        setModalIsOpen(false)
    }

    function GoWS(WK) {
        console.log(WK)

        // var selectedWk = listworkspaces.filter((w) => w.name == WK.name)
        // console.log(selectedWk)
        navigate("workspace", { state: { name: WK.name, region: WK.region, id: WK._id } })
    }


    function ListWorkspaces(){
        axios("https://api.atlas.senai.info/"+UserPool.getCurrentUser().getUsername()+"/query_workspaces")
        .then((r) => {
            console.log(r)
            setListworkspaces(r.data)
        })
        .catch((err)=>{
            console.error(err)
        })
    }

    function CreateWS() {

        axios.post("https://api.atlas.senai.info/"+ UserPool.getCurrentUser().getUsername() +"/create_workspace",{
            "name" : nomeWS,
            "region" : regionWS
        } ).then((r) => {
            console.log(r)

            ListWorkspaces()
            // navigate('workspace', { state: { name: nomeWS.toString(), region: regionWS.toString(), id: r.data.workspace_id.toString() } })
            
            

        }).catch((err) => {
            console.error(err)
        })

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

                    <button className="btnMain" onClick={OpenModal}><span>+</span> Adicionar Cliente</button>

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
        </>
    )
}