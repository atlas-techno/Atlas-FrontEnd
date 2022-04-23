import logo from "../Assets/img/Logo.svg";
import "../Assets/Css/NotFoundStyle.css";
import { Link } from "react-router-dom";

export default function NotFound() {
    return(
        <>
        <div className="containerNotfound">

            <img src={logo} alt="" />
            <h1>Not Found - Error 404</h1>
            <Link to="/" className="BackLoginNF"> Back to Login</Link>

        </div>
        </>
    )   
}