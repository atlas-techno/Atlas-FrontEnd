import logo from "../Assets/img/Logo.svg";
import React, { useState } from "react"
import UserPool from "../Utils/UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import "../Assets/Css/LoginStyle.css"
import { Link, useNavigate } from "react-router-dom";
import { usuarioAutenticado } from "../Services/auth";



export default function Login() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [msg, setMsg] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    const EfetuarLogin = (e) => {
        e.preventDefault();
        setLoading(true)

        const user = new CognitoUser({
            Username: email,
            Pool: UserPool,
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: senha,
        });

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                setLoading(false)
                localStorage.setItem('usuario-login', data.getIdToken().getJwtToken());
                
                console.log("onSuccess: ", data);

                navigate("/main")
            },
            onFailure: (err) => {
                setLoading(false)
                setMsg(true)
                console.error("onFailure: ", err);
            },
            newPasswordRequired: (data) => {
                setLoading(false)
                console.log("newPasswordRequired: ", data);
            },
        });

    }

    return (
        <div>
            <main className="mainContainerLogin" >
            <img src={logo}  alt="" />
                <div className="BgMainLogin">
                    <form className="FormContainerLogin" onSubmit={EfetuarLogin}>
                        <div className="containerForm">
                            <h1 className="h1Login" >Login</h1>

                            <div className="ContainerInputsLogin">
                                <div className="ContainerLabels">

                                    <label htmlFor="Email">Email</label>
                                    <input type="email" value={email} id="Email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="ContainerLabels">

                                    <label htmlFor="Senha">Senha</label>
                                    <input type="password" value={senha} id="Senha" onChange={(e) => setSenha(e.target.value)} />
                                </div>
                                {
                                    msg === true && <span className="ErrorMsGLogin">Login não efetuado corretamente</span>
                                }

                            </div>
                            {
                                loading === true &&  <button type="submit" disabled className="BtnLogin">Login</button>
                            }
                            {
                                loading === false &&  <button type="submit"  className="BtnLogin">Login</button>
                            }

                            <div className="ContainerNaoTemConta">
                                <span>Não tem uma conta?</span>
                                <Link to="/cadastro" className="linktoCadastro">Cadastre-se</Link>
                            </div>
                        </div>
                    </form>
                </div>

                
            </main>
        </div>
    )
}