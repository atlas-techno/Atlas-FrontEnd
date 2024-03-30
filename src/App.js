import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Cadastro from './Pages/Cadastro';
import Main from "./Pages/Main";
import NotFound from "./Pages/notFound";
import Workspace from "./Pages/Workspace";
import Perfil from './Pages/Perfil';
import Keys from './Pages/Keys';
import ConfirmPage from './Pages/ConfirmPage';
import PreConfirm from './Pages/PreConfirm';

function App() {

  const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    return !!accessToken;
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/main" element={<Main/>}/>
          <Route path="main/workspace" element={<Workspace />}/>
          <Route path="/profile" element={<Perfil/>}/>
          <Route path="/confirm" element={<ConfirmPage/>}/>
          <Route path="/keys" element={<Keys/>}/>
          <Route path="/preconfirm" element={<PreConfirm/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
