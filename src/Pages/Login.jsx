import logo from "../Assets/img/Logo.svg";
import React, { useState, useEffect, useContext } from "react"
import UserPool from "../Utils/UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import "../Assets/Css/LoginStyle.css"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { parseJwt } from "../Services/auth";
// import {AccountContext} from "../Components/Account";



export default function Login() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    // const [msg, setMsg] = useState(false)
    const [loading, setLoading] = useState(false)

    // const { authenticate } = useContext(AccountContext);

    const navigate = useNavigate()


    const EfetuarLogin = (e) => {
        // window.location.reload(false)
        setLoading(true)

        // authenticate(email, senha)
        //     .then((data) => {
        //         console.log(data)
        //     })
        //     .catch((err) => {
        //         console.error(err)
        //     })

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
                

                // var Parse = parseJwt(accessToken)
                // console.log(Parse)

                

                setLoading(false)
                localStorage.setItem('usuario-login', data.getIdToken().getJwtToken());

                navigate("/main")
                
                // toast.success("Login efetuado com sucesso!", {autoClose: 1000})
                    
                
            },
            onFailure: (err) => {
                setLoading(false)
                // setMsg(true)
                console.error("onFailure: ", err);
                toast.error("Login não efetuado com sucesso!")
            },
            newPasswordRequired: (data) => {
                setLoading(false)
                // navigate("/main")
                console.log("newPasswordRequired: ", data);
            },
        });


        

        


        

    }

    // useEffect(() => {
    //     localStorage.removeItem("usuario-login")
    // }, [])

    return (
        <div>
            <main className="mainContainerLogin" >
                <img src={logo} alt="" />
                <div className="BgMainLogin">
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
                                {/* {
                                    msg === true && <span className="ErrorMsGLogin">Login não efetuado corretamente</span>
                                } */}

                            </div>
                            {
                                loading === true && <button type="submit" disabled className="BtnLogin">Login</button>
                            }
                            {/* <Link className="linkBtnLogin" to='/main'>Login</Link> */}
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