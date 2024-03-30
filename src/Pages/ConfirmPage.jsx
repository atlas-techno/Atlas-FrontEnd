import logo from "../Assets/img/Logo.svg";
import logoM from "../Assets/img/LogoMobile.svg";
import React, { useState, useEffect, useContext } from "react"
import "../Assets/Css/ConfirmPageStyle.css"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { parseJwt } from "../Services/auth";
import { confirmSignUp } from '../Services/authService';
import BackBtn from "../Assets/img/BackBtn.svg";


export default function ConfirmPage() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const EfetuarConfirm = async (e) => {
        setLoading(true)

        e.preventDefault();
        try {
          await confirmSignUp(email, senha);
          
          toast.success("Conta confirmada com sucesso!")  
          
          navigate('/');
        } catch (error) {
            setLoading(false)
          alert(`Failed to confirm account: ${error}`);
        }
    }

    return (
        <div>
            <main className="mainContainerConfirm" >
                
                <div className="BgMainConfirm">
                
                        <img src={logo} className="LogoMobile" alt="" />
                        <h1 className="H1Mobile">Bem Vindo ao Atlas</h1>
                    
                    <form className="FormContainerConfirm" >
                        
                        <div className="containerForm">
                            <h1 className="h1Confirm" >Verificação de email</h1>

                            <div className="ContainerInputsConfirm">
                            
                                <div className="ContainerLabels">

                                    <label htmlFor="Email">Email</label>
                                    <input type="email" value={email} id="Email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="ContainerLabels">

                                    <label htmlFor="Senha">Codigo</label>
                                    <input type="text" value={senha} id="Senha" onChange={(e) => setSenha(e.target.value)} />
                                </div>

                            </div>
                            {
                                loading === true && <button type="submit" disabled className="BtnConfirm">Confirm</button>
                            }

                            {
                                loading === false && <button onClick={EfetuarConfirm} className="BtnConfirm">Confirm</button>
                            }
                            <div className="ContainerVoltaLogin">
                                <Link to="/" className="linktoCadastro">Voltar para o Login</Link>
                            </div>

                        </div>
                    </form>
                </div>
                <ToastContainer />

            </main>
        </div>
    )
}
