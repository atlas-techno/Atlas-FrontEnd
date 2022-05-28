import { useState, useEffect } from "react";
import Header from "../Components/Header"
import "../Assets/Css/MainPage.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import UserPool from "../Utils/UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { parseJwt } from "../Services/auth.js";
import { db } from "../Services/firebaseConfig";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where
} from "firebase/firestore";
import { async } from "@firebase/util";


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


    const [listworkspaces, setListworkspaces] = useState([])
    const [user, setUser] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [nomeWS, setNomeWS] = useState("")
    const [regionWS, setRegionWS] = useState("us-east-1")
    const navigate = useNavigate()

    const [Path, setPath] = useState("Users/QZSVr1RLjuPg7I7e21nm/Workspaces")

    
    const workspaceCollection = collection(db, Path)

    const userCollection = collection(db, "Users")

    const idCognito = UserPool.getCurrentUser().getUsername()

    useEffect(() => {
        const GetIdUrl = async () => {
            const seluser =  user.filter((u) => u.username === idCognito)
    
            
            setPath("Users/"+seluser[0].id+"/Workspaces")
             
        }

        GetIdUrl()
    }, [])
    
    

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
        navigate("workspace", { state: { name: WK.name, region: WK.region } })
    }


    // function ListWorkspaces(){
    //     axios("http://192.168.5.22:8000/"+UserPool.getCurrentUser().getUsername()+"/query_workspaces")
    //     .then((r) => {
    //         console.log(r)
    //         setListworkspaces(r.data)
    //     })
    //     .catch((err)=>{
    //         console.error(err)
    //     })
    // }

    function CreateWS() {
        // for (let i = 0; i < listworkspaces.length; i++) {
        //     if (nomeWS === listworkspaces[i].nameworkspace) {
        //         toast.error("Sua Workspace tem o mesmo nome");
        //     }  
            
        // }

        axios.post("http://192.168.5.22:8000/"+ UserPool.getCurrentUser().getUsername() +"/create_workspace",{
            "name" : nomeWS,
            "region" : regionWS
        } ).then((r) => {
            console.log(r)
        }).catch((err) => {
            console.error(err)
        })

        console.log(nomeWS)
        console.log(regionWS)

        navigate('workspace', { state: { name: nomeWS.toString(), region: regionWS.toString() } })
    }



    useEffect(() => {

        const getUsers = async () => {
            const data = await getDocs(userCollection)


            // console.log(data)
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))


        }

        getUsers()
        //    ListWorkspaces()
    }, [])

    useEffect(() => {
        const getWS = async () => {
            const data = await getDocs(workspaceCollection)

            setListworkspaces(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

            console.log(listworkspaces)
        }

        getWS()
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

                                <div onClick={() => GoWS(WK)} className="containerWS" key={WK.id}>

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