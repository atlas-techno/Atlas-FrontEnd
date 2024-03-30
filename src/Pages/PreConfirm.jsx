import logo from "../Assets/img/Logo.svg";
import "../Assets/Css/NotFoundStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { parseJwt } from "../Services/auth";


export default function PreConfirm() {
    const navigate = useNavigate()

    function Logout(e) {
        e.preventDefault()
        sessionStorage.clear()
        navigate("/")
    }

    return(
        <>
        <div className="containerNotfound">

            <img src={logo} alt="" />
            <h1>Um email com o codigo de verificação foi enviado para sua caixa de email</h1>
            <Link to="/confirm" className="BackLoginNF">Confirme</Link>
            <span onClick={Logout} className="BackLoginNF"> Volte para o Login</span>

        </div>
        </>
    )   
}