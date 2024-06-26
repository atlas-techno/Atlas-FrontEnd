import { useState, useEffect } from "react";
import Header from '../Components/Header'
import axios from 'axios';
import '../Assets/Css/Keys.css'
import DI from "../Assets/img/DownloadIcon.svg";
import RI from "../Assets/img/ReloadIcon.svg";
import { parseJwt } from "../Services/auth";
import { saveAs } from "file-saver";
import { toast, ToastContainer } from "react-toastify";
import config from "../Utils/config.json";

export default function Keys() {
    const [key_name, setKey_name] = useState("")
    const [listKey, setListKey] = useState([])
    const [listworkspaces, setListworkspaces] = useState([])
    const currentUser =  (parseJwt(sessionStorage.getItem('idToken')).name).trim()

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

    function ListKeys() {
        axios(config.apiEndpoint + currentUser + "/query_ssh_keys")
            .then((r) => {
                console.log(r)
                setListKey(r.data)

            }).catch((err) => { console.log(err) })
    }

    function CreateKey(event) {
        event.preventDefault()
        let Key = {
            name: key_name.trim()
        }
        if (listworkspaces.length === 0) {
            
            toast.warn("Você precisa criar uma workspace antes de criar uma Key")
            return
        } else{
            axios.post(config.apiEndpoint + currentUser + "/create_key", Key)
                .then((r) =>{
                    console.log(r)
                    toast.success("Key criada com sucesso!")
                    ListKeys()
                }).catch((err) => { console.log(err) })

        }


    }

    function DownloadKey(keyname) {
        let Key = {
            name: keyname
        }
        console.log(Key)
        axios.post(config.apiEndpoint + currentUser + "/keys", Key)
            .then((r) => {
                console.log(r)
                saveAs(r.data.url,"example.pem")
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        
        ListKeys()
        ListWorkspaces()
    }, [])

    

    return (
        <>
            <Header />
            <ToastContainer />
            <main className='MainBG'>
                <div className="containerKeys">

                    <div className='ContainerTitleKeys'>
                        <h1>Minhas Keys</h1>
                    </div>
                    <form className='Forms_Keys' onSubmit={CreateKey}>
                        <input type="text" placeholder='Cadastre sua chave' onChange={(e) => setKey_name(e.target.value)} className='input_NameK' />
                        <button type="submit" className='btn_FormKCadastro' >Cadastrar</button>

                    </form>
                </div>

                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Key Name</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listKey.map((key) => {
                                return (
                                    <tr key={key._id} class="active-row">
                                        <td>{key.key_name}</td>
                                        <td className="BlockBtn">
                                            <button className='btn_FormK' onClick={() => DownloadKey(key.key_name)}><img src={DI} className="DIkeys" alt="Icone de download para a ssh key" />Download</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </main>
        </>
    )
}
