import React, { useState } from "react"
//import UserPool from "../Utils/UserPool";
import "../Assets/Css/CadastroStyle.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import BackBtn from "../Assets/img/BackBtn.svg";
import { signIn, signUp } from "../Services/authService";


export default function Cadastrar() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [nomeC, setNomeC] = useState("")
    const [Access, setAccess] = useState("")
    const [Private, setPrivate] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    const  Cadastrar = async (event) => {
        event.preventDefault()
        setLoading(true)
        console.log(email)
        console.log(senha)
        console.log(nomeC)

        try {
            await signUp(nomeC,email, senha,Access,Private);
            toast.success("Cadastro realizado com sucesso!")  
            
          } catch (error) {
            setLoading(false)
            alert(`Sign up failed: ${error}`);
            toast.error("Cadastro não efetuado corretamente!")
          }

          

        // UserPool.signUp(email, senha, [{
        //     Name: 'name',
        //     Value: nomeC
        // },
        // {
        //     Name: 'custom:Access_Key',
        //     Value: Access
        // },
        // {
        //     Name: 'custom:Private_Key',
        //     Value: Private
        // }], null, (err, data) => {
        //     if (err) {
        //         setLoading(false)
        //         toast.error("Cadastro não efetuado corretamente!")
        //         console.error(err)
        //     } else {
        //         setLoading(false)
                
        //         console.log(data)
        //         setEmail('')
        //         setSenha('')
        //         setNomeC('')
        //         setAccess('')
        //         setPrivate('')
        //         toast.success("Cadastro realizado com sucesso!")  
        //     }     
        // })
    }

    return (
        <>
            <ToastContainer/>
            <div className="ContainerSignup">
                <form onSubmit={Cadastrar} className="FormSingup">
                    <div className="contBtnBack">

                        <Link to="/" className="VoltarCadastroMobile"><img src={BackBtn} className="backBtn" alt="Botão para voltar a tela de login" /></Link>
                    </div>
                    <div className="ContainerInputs1">

                        <Link to="/" className="VoltarCadastro"><img src={BackBtn} className="backBtn" alt="Botão para voltar a tela de login" /></Link>
                        <h1 >Cadastro</h1>
                        <label htmlFor="Name">Nome Completo</label>
                        <input type="text" value={nomeC} id="Name" onChange={(e) => setNomeC(e.target.value)} />
                        <label htmlFor="Email">Email</label>
                        <input type="email" value={email} id="Email" onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="Senha">Senha</label>
                        <input type="password" value={senha} id="Senha" onChange={(e) => setSenha(e.target.value)} />
                        <div className="containerListCad">

                            <span >Sua senha de conter:</span>
                            <ul>
                                <li>No minimo 8 caracteres.</li>
                                <li>Ter pelo menos uma letra maiuscula.</li>
                                <li>Ter pelo menos um caracter especial.</li>
                            </ul>
                        </div>
                        

                    </div>

                    <div className="ContainerInputs2">
                        <label htmlFor="AccessKey">Access Key</label>
                        <input type="password" value={Access} id="AccessKey" onChange={(e) => setAccess(e.target.value)} />
                        <label htmlFor="PrivateKey" className="LabelPrivateKey">Private Key</label>
                        <input type="password" value={Private} id="PrivateKey" onChange={(e) => setPrivate(e.target.value)} />
                        <div className="Containerbtn">

                            {
                                loading === true && <button type="submit" disabled className="BtnSignup">Cadastrar</button>
                            }
                            {
                                loading === false && <button type="submit" className="BtnSignup">Cadastrar</button>
                            }


                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}