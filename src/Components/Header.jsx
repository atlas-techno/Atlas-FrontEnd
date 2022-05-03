import { useNavigate } from "react-router-dom";
import Logo from "../Assets/img/Logo.svg";
import logoutIcon from "../Assets/img/logout.png";
import "../Assets/Css/HeaderStyle.css"
import Pool from "../Utils/UserPool";


export default function Header() {

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

    const BackHome = () =>{
        navigate("/main")
    }

    

    return (
        <>
            <div className="MainHeader">
                <div className="Container_Header">

                    <img src={Logo} onClick={BackHome} alt="Foto de Perfil" className="PfPHeader" />
                    <button onClick={Logout} className="btnLogoutHeader"><img src={logoutIcon} alt="Botão Logout" /> </button>
                </div>
            </div>
        </>
    )
}