import React from 'react'
import Header from '../Components/Header'

import '../Assets/Css/Keys.css'
import  DI  from "../Assets/img/DownloadIcon.svg";

export default function Keys() {
    return (
        <>
            <Header />
            <main className='MainBG'>
                <div className="containerKeys">

                    <div className='ContainerTitleKeys'>
                        <h1>Minhas Keys</h1>
                    </div>
                    <form className='Forms_Keys'>
                        <input type="text" placeholder='Cadastre sua chave' className='input_NameK' />
                        <button className='btn_FormKCadastro'>Cadastrar</button>

                    </form>
                </div>

                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Key Name </th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>MainKey</td>
                            <td><button className='btn_FormK'><img src={DI} className="DIkeys" alt="Icone de download para a ssh key" /> Download</button></td>
                        </tr>
                        <tr class="active-row">
                            <td>AdminKey</td>
                            <td><button className='btn_FormK'><img src={DI} className="DIkeys" alt="Icone de download para a ssh key" />Download</button></td>
                        </tr>
                        <tr>
                            <td>MainKey</td>
                            <td><button className='btn_FormK'><img src={DI} className="DIkeys" alt="Icone de download para a ssh key" /> Download</button></td>
                        </tr>
                        <tr class="active-row">
                            <td>AdminKey</td>
                            <td><button className='btn_FormK'><img src={DI} className="DIkeys" alt="Icone de download para a ssh key" />Download</button></td>
                        </tr>
                        <tr>
                            <td>MainKey</td>
                            <td><button className='btn_FormK'><img src={DI} className="DIkeys" alt="Icone de download para a ssh key" /> Download</button></td>
                        </tr>
                        <tr class="active-row">
                            <td>AdminKey</td>
                            <td><button className='btn_FormK'><img src={DI} className="DIkeys" alt="Icone de download para a ssh key" />Download</button></td>
                        </tr>
                        <tr>
                            <td>MainKey</td>
                            <td><button className='btn_FormK'><img src={DI} className="DIkeys" alt="Icone de download para a ssh key" /> Download</button></td>
                        </tr>
                        <tr class="active-row">
                            <td>AdminKey</td>
                            <td><button className='btn_FormK'><img src={DI} className="DIkeys" alt="Icone de download para a ssh key" />Download</button></td>
                        </tr>
                        
                    </tbody>
                </table>
            </main>
        </>
    )
}
