import React, { useState } from "react";
import Layout from "../components/Layout";

export default function Rastreamento() {
  const [orderId, setOrderId] = useState("");
  const [tracking, setTracking] = useState([]);
  const [msg, setMsg] = useState("");
  const token = localStorage.getItem("token");

  const buscarRastreamento = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/tracking/${orderId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Pedido não encontrado ou erro no rastreio");
      const data = await res.json();
      setTracking(data);
      setMsg("");
    } catch (error) {
      setMsg(error.message);
      setTracking([]);
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Rastreamento de Pedido</h1>
        <div className="mb-6">
          <input
            type="number"
            placeholder="ID do Pedido"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={buscarRastreamento}
            className="bg-blue-700 text-white px-4 py-2 rounded"
          >
            Buscar
          </button>
        </div>
        {msg && <p className="text-red-500 mb-4">{msg}</p>}
        {tracking.length > 0 ? (
          <ul>
            {tracking.map((t) => (
              <li key={t.id}>
                Status: {t.status} (Pedido ID: {t.order_id})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhuma atualização encontrada.</p>
        )}
      </div>
    </Layout>
  );
}