import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Pedidos() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center">Área protegida: Pedidos</h1>
      <p className="text-center text-gray-600 mt-4">Aqui você poderá listar, cadastrar ou gerenciar pedidos.</p>
    </div>
  );
}