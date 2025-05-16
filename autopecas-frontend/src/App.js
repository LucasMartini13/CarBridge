import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AutoPartsHome from "./pages/AutoPartsHome";
import Login from "./pages/Login";
import Pedidos from "./pages/Pedidos";
import Cadastro from "./pages/Cadastro";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AutoPartsHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
    </Router>
  );
}