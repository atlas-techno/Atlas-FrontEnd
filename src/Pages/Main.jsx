import { useState } from "react";
import Header from "../Components/Header"
import "../Assets/Css/MainPage.css"
import axios from 'axios';


export default function MainPage() {

    const [imagemProduto, setImagemProduto] = useState('');

    

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


    const GetImg = () =>{

        
    }
    return (
        <>
            <Header />
            <main className="MainBG">
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