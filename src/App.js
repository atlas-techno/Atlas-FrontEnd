import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Cadastro from './Pages/Cadastro';


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login/>}/> 
            <Route path="/cadastro" element={<Cadastro/>}/> 

 
        </Routes>
    </Router>
  );
}

export default App;
