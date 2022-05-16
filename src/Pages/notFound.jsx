import logo from "../Assets/img/Logo.svg";
import "../Assets/Css/NotFoundStyle.css";
import { useNavigate } from "react-router-dom";

import Pool from "../Utils/UserPool";

export default function NotFound() {

    const navigate = useNavigate()


    function Logout(e) {
        e.preventDefault()

        const user = Pool.getCurrentUser()



        if (user) {
            user.signOut()
            localStorage.clear()
        }
        navigate("/")

    }

    return(
        <>
        <div className="containerNotfound">

            <img src={logo} alt="" />
            <h1>Not Found - Error 404</h1>
            <span className="BackLoginNF" onClick={() => navigate(-1)}> Voltar para ultima tela</span>
            <span onClick={() => Logout()} className="BackLoginNF"> Back to Login</span>

        </div>
        </>
    )   
}