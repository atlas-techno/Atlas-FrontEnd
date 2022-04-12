import React, {useState, useEffect} from "react"
import UserPool from "../Utils/UserPool";
import {CognitoUser} from 'amazon-cognito-identity-js';



export default function Cadastrar() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [nomeC, setNomeC] = useState("")
    
    
    
    

    //{name: nomeC},{Access_Key: "12345"},{Secret_Key: "123456"}    

    Cadastrar = (event) =>{
        event.preventDefault()

        console.log(email)
        console.log(senha)
        console.log(nomeC)

        // AtributeList = [
        //     {
        //         Name: 'name',
        //         value: nomeC
        //     },
        //     {
        //         Name: 'Access_Key',
        //         Value: 
        //     }
        // ]

        
        
        UserPool.signUp(email, senha,  [{Name: 'name',Value: nomeC }], null, (err, data) => {
            if (err) {
                console.error(err)
            }
            console.log(data)
        })
    }



    return(
        <>
        <form onSubmit={Cadastrar}>
            <label htmlFor="Name">Nome Completo</label>
            <input type="text" value={nomeC} id="Name" onChange={(e) => setNomeC(e.target.value)} />
            <label htmlFor="Email">Email</label>
            <input type="email" value={email} id="Email" onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="Senha">Senha</label>
            <input type="text" value={senha} id="Senha" onChange={(e) => setSenha(e.target.value)} />
            <button type="submit">Enviar</button>

        </form>
        </>
    )
}