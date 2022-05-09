import { useState, useEffect } from "react";
import Header from "../Components/Header"
import "../Assets/Css/MainPage.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import UserPool from "../Utils/UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { parseJwt } from "../Services/auth.js";


Modal.setAppElement('#root')

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.40)'

    },
    content: {
        width: '40%',
        height: '40%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        border: 'none',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        transform: 'translate(-50%, -50%)',
        backdropFilter: 'blur(6px)',
    },
};

export default function MainPage() {


    const [listworkspaces, setListworkspaces] = useState([
        {
            "user": "usertest",
            "idworkspace": "1",
            "nameworkspace": "teste1",
            "region": "us-east-01"
        },
        {
            "user": "usertest",
            "idworkspace": "2",
            "nameworkspace": "teste2",
            "region": "us-east-01"
        },
        {
            "user": "usertest",
            "idworkspace": "3",
            "nameworkspace": "teste3",
            "region": "us-east-01"
        }

    ])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [nomeWS, setNomeWS] = useState("")
    const [regionWS, setRegionWS] = useState("")
    const navigate = useNavigate()


    // const listarWS = () => {
    //     axios.get("https://oioioioi.free.beeceptor.com/oi")
    //         .then(d => {

    //             setListworkspaces(d.data)
    //             console.log(d.data)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }
    // useEffect(() => {
    //     listarWS()
    // }, [])
    function OpenModal() {
        setModalIsOpen(true)
        
    }

    function CloseModal() {
        setModalIsOpen(false)
    }

    function GoWS(WK) {
        console.log(WK.idworkspace)


        var selectedWk = listworkspaces.filter((w) =>  w.idworkspace == WK.idworkspace)

        
        console.log(selectedWk)

        // console.log(e.getAttribute('key'))
        // console.log(e.target.options[selectedIndex].getAttribute('key'));

        

        navigate("workspace",{state: {name: selectedWk[0].nameworkspace,region: selectedWk[0].region}})
    }

    function CreateWS() {
        // axios.post("http://3.214.253.118:8000/"+ )

        console.log(nomeWS)
        console.log(regionWS)

        navigate( 'workspace',{state: {name: nomeWS.toString(),region: regionWS.toString()}})
    }

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
                    style={customStyles}
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

                                <div onClick={() => GoWS(WK)} className="containerWS" key={WK.idworkspace}>

                                    <h2    id="h2Name">{WK.nameworkspace}</h2>
                                    <span  id="SpanRegion">{WK.region}</span>

                                </div>
                            )
                        })
                    }

                </div>

            </main>
        </>
    )
}