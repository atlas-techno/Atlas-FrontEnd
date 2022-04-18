import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Cadastro from './Pages/Cadastro';
import Main from "./Pages/Main";
import NotFound from "./Pages/notFound";


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login/>}/> 
            <Route path="/cadastro" element={<Cadastro/>}/> 
            <Route path="/main" element={<Main/>}/> 
            <Route path="/*" element={<NotFound/>}/> 
        </Routes>
    </Router>
  );
}

export default App;
