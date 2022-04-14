import React, { useState, useEffect } from "react"
import UserPool from "../Utils/UserPool";
import "../Assets/Css/CadastroStyle.css";
// import {CognitoUser} from 'amazon-cognito-identity-js';
// import S3FileUpload from 'react-s3';
// import Amplify from "@aws-amplify/core";
// import { Storage } from "aws-amplify";
// import { Auth } from 'aws-amplify';

export default function Cadastrar() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [nomeC, setNomeC] = useState("")
    const [Access, setAccess] = useState("")
    const [Private, setPrivate] = useState("")




    const Cadastrar = (event) => {
        event.preventDefault()

        console.log(email)
        console.log(senha)
        console.log(nomeC)


        var AtributeList = [
            {
                Name: 'name',
                Value: nomeC
            },
            {
                Name: 'custom:Access_Key',
                Value: Access
            },
            {
                Name: 'custom:Private_Key',
                Value: Private
            }
        ]


        UserPool.signUp(email, senha, [{
            Name: 'name',
            Value: nomeC
        },
        {
            Name: 'custom:Access_Key',
            Value: Access
        },
        {
            Name: 'custom:Private_Key',
            Value: Private
        }], null, (err, data) => {
            if (err) {
                console.error(err)
            }
            console.log(data)
        })


    }



    return (
        <>
            <div className="ContainerSignup">
                <form onSubmit={Cadastrar} className="FormSingup">
                    <div className="ContainerInputs1">
                        <h1 >Cadastro</h1>
                        <label htmlFor="Name">Nome Completo</label>
                        <input type="text" value={nomeC} id="Name" onChange={(e) => setNomeC(e.target.value)} />
                        <label htmlFor="Email">Email</label>
                        <input type="email" value={email} id="Email" onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="Senha">Senha</label>
                        <input type="password" value={senha} id="Senha" onChange={(e) => setSenha(e.target.value)} />
                    </div>

                    <div className="ContainerInputs2">
                        <label htmlFor="AccessKey">Access Key</label>
                        <input type="password" value={Access} id="AccessKey" onChange={(e) => setAccess(e.target.value)} />
                        <label htmlFor="PrivateKey" className="LabelPrivateKey">Private Key</label>
                        <input type="password" value={Private} id="PrivateKey" onChange={(e) => setPrivate(e.target.value)} />
                        <div className="Containerbtn">
                            <button type="submit" className="BtnSignup">Cadastrar</button>

                        </div>
                    </div>



                </form>
                {/* <input type="file"  id="PrivateKey" /> */}
            </div>
        </>
    )
}