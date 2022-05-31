import { useNavigate } from "react-router-dom";
import Logo from "../Assets/img/Logo.svg";
import logoutIcon from "../Assets/img/logoutIcon.svg";
import "../Assets/Css/HeaderStyle.css"
import Pool from "../Utils/UserPool";
import profileIconsvg from "../Assets/img/ProfileIcon.svg"
import Defaultpfp from "../Assets/img/DefaultPfp.svg";


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

    const BackHome = () => {
        navigate("/main")
    }



    return (
        <>
            <div className="MainHeader">
                <div className="Container_Header">

                    <img src={Logo} onClick={BackHome} alt="Foto de Perfil" className="PfPHeader" />

                    <div class="dropdown">
                        <button class="dropbtn"> <img src={Defaultpfp} className="iconProfile" alt="Icone Perfil" /> </button>
                        <div class="dropdown-content">
                            {/* <button onClick={Logout} className="btnLogoutHeader"> </button> */}
                            {/* <span onClick={() => navigate("/profile")}><img src={profileIconsvg} className="logoutIcon"/>Perfil</span> */}
                            <span href="#" onClick={Logout} ><img className="logoutIcon" src={logoutIcon} alt="Botão Logout" /> Logout</span>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}