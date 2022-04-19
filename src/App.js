import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Cadastro from './Pages/Cadastro';
import Main from "./Pages/Main";
import NotFound from "./Pages/notFound";
import { parseJwt, usuarioAutenticado } from '../src/Services/auth';
// import { render } from '@testing-library/react';


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

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/main" element={
            usuarioAutenticado() ? (
            <Main />
            ) : (
              <Navigate replace to="/" />
          )} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
