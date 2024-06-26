import { useNavigate } from "react-router-dom";
import Logo from "../Assets/img/Logo.svg";
import logoutIcon from "../Assets/img/logoutIcon.svg";
import "../Assets/Css/HeaderStyle.css"
import { parseJwt } from "../Services/auth";
import Key from "../Assets/img/key-solid.svg";


export default function Header() {

    const navigate = useNavigate()

    function Logout(e) {
        e.preventDefault()
        
        const currentUser =  (parseJwt(sessionStorage.getItem('idToken')).name).trim()

        if (currentUser) {
            sessionStorage.clear()
        }
        navigate("/")

    }

    const BackHome = () => {
        navigate("/main")
    }

    return (
        <>
            <div className="MainHeader">
                <div className="Container_Header">

                    <img src={Logo} onClick={BackHome} alt="Foto de Perfil" className="PfPHeader" />
                    <div className="contloginbtn">
                        <div onClick={() => navigate("/keys")} className="contMykeys">
                            <img className="logoutIcon" src={Key} alt="Botão Logout" />
                            <h2>Keys</h2>
                        </div>
                        <div onClick={Logout} className="boxHeader" >
                            <img className="logoutIcon" src={logoutIcon} alt="Botão Logout" />
                            <span className="logoutTXT">Logout</span>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}