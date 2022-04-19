import { Link } from "react-router-dom";
import Logo from "../Assets/img/Logo.svg";
import logoutIcon from "../Assets/img/logoutIcon.svg";
import "../Assets/Css/HeaderStyle.css"

export default function Header() {
    return (
        <>
            <div className="MainHeader">
                <div className="Container_Header">

                    <img src={Logo} alt="Foto de Perfil" className="PfPHeader" />
                    <Link to="/"> <img src={logoutIcon} alt="Botão Logout" className="btnLogoutHeader" /> </Link>
                </div>
            </div>
        </>
    )
}