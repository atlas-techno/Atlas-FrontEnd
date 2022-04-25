import { useState, useEffect } from "react";
import Header from "../Components/Header"
import "../Assets/Css/MainPage.css"
import axios from 'axios';


export default function MainPage() {

    const [imagemProduto, setImagemProduto] = useState('');
    const [listworkspaces, setListworkspaces] = useState([])

    const listarWS = () => {
        axios.get("https://oioioioi.free.beeceptor.com/oi")
            .then(d => {
                
                setListworkspaces(d.data)
                console.log(  d.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        listarWS()
    }, [])
    


    const PostIMG = () => {
        var forms = new FormData();

        const element = document.getElementById('arquivo')
        const file = element.files[0]
        console.log(file)
        forms.append('arquivo', file, file.name)

        axios({
            method: 'post',
            url: '192.168.4.179:8000/upload',
            data: forms,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(resposta => {
                if (resposta.status === 201) {
                    console.log('Imagem Cadastrado');

                }
            })
            .catch(erro => console.log(erro))


    }

    return (
        <>
            <Header />
            <main className="MainBG">
                <div className="containerBtnCreate">
                    <div className="btn">

                        <span>Teste</span>
                    </div>
                </div>
                <div className="containerWrapper">

                {
                    listworkspaces.map((WK) => {
                        return(

                            <div className="containerWS" key={WK.idworkspace}>

                                <h2>{WK.nameworkspace}</h2>
                                <span>{WK.region}</span>

                            </div>
                                )
                    })
                }

                        </div>
                {/* <div className="containerWS">

                        <h2>Darede</h2>
                        <span>Us-East-01</span>

                    </div>
                    <div className="containerWS">

                        <span>Teste</span>
                    </div>
                    <div className="containerWS">

                        <span>Teste</span>
                    </div>
                    <div className="containerWS">

                        <span>Teste</span>
                    </div>
                    <div className="containerWS">

                        <span>Teste</span>
                    </div>
                    <div className="containerWS">

                        <span>Teste</span>
                    </div>
                   */}






                {/* <form onSubmit={PostIMG}>

                    <input
                        className="input-produto inputImage-cadastroProd"
                        type="file"
                        name="arquivo"
                        id="arquivo"
                        value={imagemProduto}
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(campo) => setImagemProduto(campo.target.value)}
                    />
                    <button type="submit">Upload</button>
                </form> */}


            </main>
        </>
    )
}