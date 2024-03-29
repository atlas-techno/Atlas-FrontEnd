import React, { useState } from 'react'
import Header from '../Components/Header'
import {getCurrentUser} from "../Utils/UserPool";
import { parseJwt } from "../Services/auth";

export default function Perfil() {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const user = getCurrentUser("a");

    var token = localStorage.getItem("usuario-login")

    var parseToken = parseJwt(token)

    return (
        <div>
            <Header />
            <main className="MainWK">
                <div className="containerProfile">
                    <h1>{parseToken.name}</h1>
                    <h1>{parseToken.email}</h1>

                </div>
            </main>
        </div>
    )
}
