import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AutoPartsHome from "./pages/AutoPartsHome";
import Login from "./pages/Login";
import Pedidos from "./pages/Pedidos";
import Cadastro from "./pages/Cadastro";
import Catalogo from "./pages/Catalogo";
import AdminDashboard from "./pages/AdminDashboard";
import Rastreamento from "./pages/Rastreio";
import Estoque from "./pages/Estoque";
import ProdutoDetalhe from "./pages/ProdutoDetalhe";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AutoPartsHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/rastreio" element={<Rastreamento />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/produto/:id" element={<ProdutoDetalhe />} />
        <Route path="*" element={<div style={{padding: 40, textAlign: "center"}}><h1>404 - Página não encontrada</h1></div>} />
      </Routes>
    </Router>
  );
}