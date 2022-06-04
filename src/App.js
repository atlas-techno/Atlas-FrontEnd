import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Cadastro from './Pages/Cadastro';
import Main from "./Pages/Main";
import NotFound from "./Pages/notFound";
import Workspace from "./Pages/Workspace";
import Perfil from './Pages/Perfil';
import Keys from './Pages/Keys';

function App() {
  
  


  // const Permissaoadm = ({ component: Element }) => (
  //   <Route
  //     element={(props) =>
  //       usuarioAutenticado() === true ? (
  //         <Element {...props} />
  //       ) : (
  //         <Link to="/" />
  //       )
  //     }
  //   />
  // );



  // usuarioAutenticado() ? (
  //   <Navigate replace to="/main" />
  //   ) : (
  //     <Main />
  //   )

  // element={
  //   usuarioAutenticado() ? (
  //     <Navigate replace to="main" />
  //     ) : (
  //     <Login />
  // )} />
  // localStorage.getItem('usuario-login') != null

  
  // UserPool.getCurrentUser() ? (
  //   <Main />
  //   ) : (
  //     <Navigate to="/" />
  // )} >

  
  // UserPool.getCurrentUser() ? (
  //   <Workspace />
  //   ) : (
  //     <Navigate to="/" />
  // )} />

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/main" element={<Main/>}>
            </Route>
          <Route path="main/workspace" element={<Workspace />}/>
          <Route path="/profile" element={<Perfil/>}/>
          <Route path="/keys" element={<Keys/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
