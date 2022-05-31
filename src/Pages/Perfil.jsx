import React, { useState } from 'react'
import Header from '../Components/Header'
import Pool from "../Utils/UserPool";
import { parseJwt } from "../Services/auth";

export default function Perfil() {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const user = Pool.getCurrentUser()

    var token = localStorage.getItem("usuario-login")

    var parseToken = parseJwt(token)

    

    // function SubmitForm(event) {
    //     event.preventDefault()
        
        
        
    //     user.changePassword(oldPassword, newPassword, (err, result) => {
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             console.log(result)
    //         }
    //     })

    // }

    // user.getUserAttributes((err, attributes) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log(attributes)
    //     }
    // })

    // console.log(user)
    // useEffect(() => {
    //     c
    // }, [])
    return (
        <div>
            <Header />
            <main className="MainWK">
                <div className="containerProfile">
                    <h1>{parseToken.name}</h1>
                    <h1>{parseToken.email}</h1>

                </div>
                {/* <form onSubmit={SubmitForm}>
                    <input type="text" placeholder={"old passworld"} onChange={(e) => setOldPassword(e.target.value)} />
                    <input type="text" placeholder={"new passworld"} onChange={(e) => setNewPassword(e.target.value)} />
                    <button type="submit">Change Password</button>
                </form> */}
            </main>
        </div>
    )
}
