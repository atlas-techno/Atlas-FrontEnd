import logo from "../Assets/img/Logo.svg";
import logoM from "../Assets/img/LogoMobile.svg";
import React, { useState, useEffect, useContext } from "react"
import UserPool from "../Utils/UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import "../Assets/Css/LoginStyle.css"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { parseJwt } from "../Services/auth";


export default function Login() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    
    const [loading, setLoading] = useState(false)

    

    const navigate = useNavigate()



    const EfetuarLogin = (e) => {
         window.location.reload(false)
        setLoading(true)

        /*authenticate(email, senha)
             .then((data) => {
                 console.log(data)
             })
             .catch((err) => {
                 console.error(err)
             })
	*/
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
                user.getUserAttributes((err, attributes) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(attributes)
                    }
                })

                user.getSession((err, session) => {
                    if (err) {
                        console.log(err)
                    } else {
                        sessionStorage.setItem('user-session', session.idToken.jwtToken)
                    }
                })

                localStorage.setItem('usuario-login', data.getIdToken().getJwtToken());
                navigate("/main")
                
                setLoading(false)

            },
            onFailure: (err) => {
                setLoading(false)
                
                console.error("onFailure: ", err);
                toast.error("Login não efetuado com sucesso!")
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
                <img src={logo} className="imgLogo" alt="" />
                <div className="BgMainLogin">
                        <img src={logo} className="LogoMobile" alt="" />
                        <h1 className="H1Mobile">Bem Vindo ao Atlas</h1>
                    <form className="FormContainerLogin" >
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

                            </div>
                            {
                                loading === true && <button type="submit" disabled className="BtnLogin">Login</button>
                            }

                            {
                                loading === false && <button onClick={EfetuarLogin} className="BtnLogin">Login</button>
                            }

                            <div className="ContainerNaoTemConta">
                                <span>Não tem uma conta?</span>
                                <Link to="/cadastro" className="linktoCadastro">Cadastre-se</Link>
                            </div>
                        </div>
                    </form>
                </div>
                <ToastContainer />

            </main>
        </div>
    )
}
