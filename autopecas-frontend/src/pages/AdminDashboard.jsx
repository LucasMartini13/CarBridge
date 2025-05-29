import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Administrativa</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/pedidos" className="bg-blue-600 text-white p-6 rounded-lg text-center hover:bg-blue-700 transition">
            Gerenciar Pedidos
          </Link>
          <Link to="/estoque" className="bg-green-600 text-white p-6 rounded-lg text-center hover:bg-green-700 transition">
            Gerenciar Estoque
          </Link>
          {/* Adicione mais links conforme necessário */}
        </div>
        <div className="mt-8 text-center text-gray-600">
          <p>Bem-vindo(a) à área administrativa do CarBridge!</p>
        </div>
      </div>
    </Layout>
  );
}