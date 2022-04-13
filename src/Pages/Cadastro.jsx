import React, {useState} from "react"
import UserPool from "../Utils/UserPool";
// import {CognitoUser} from 'amazon-cognito-identity-js';
import S3FileUpload from 'react-s3';

export default function Cadastrar() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [nomeC, setNomeC] = useState("")
    const [Access, setAccess] = useState("")
    const [Private, setPrivate] = useState("")
    // const [Pfp, setPfp] = useState("")
    
    
    const CreateBucket = (e) =>{
        
            const config = {
                bucketName: "A" + nomeC + Math.floor((Math.random() * 1000) + 1),
                dirName: 'profilePhoto', 
                region: 'us-east-1',
                accessKeyId: 'AKIA6FJTISO6RD4ZGMK7',
                secretAccessKey: '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',
            }

            S3FileUpload.uploadFile(e.target.files[0], config)
            .then((data) =>{
                console.log(data)
            })
            .catch((err)=> {
                console.log(err)
            })
    
        
    }
    
    
     
    
    

    //{name: nomeC},{Access_Key: "12345"},{Secret_Key: "123456"}    

    const Cadastrar = (event) =>{
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

        // {Name: 'name', Value: nomeC},{Name: 'custom:Access_Key',Value: Access},{Name: 'custom:Private_Key',Value: Private}

        
        
        UserPool.signUp(email, senha, [AtributeList], null, (err, data) => {
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
            <label htmlFor="AccessKey">Access Key</label>
            <input type="text" value={Access} id="AccessKey" onChange={(e) => setAccess(e.target.value)} />
            <label htmlFor="PrivateKey">Private Key</label>
            <input type="text" value={Private} id="PrivateKey" onChange={(e) => setPrivate(e.target.value)} />

            <button type="submit">Enviar</button>

        </form>
            <input type="file"  id="PrivateKey" onChange={CreateBucket} />
        </>
    )
}