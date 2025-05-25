import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [item, setItem] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");

  // Use useCallback para evitar o warning do ESLint
  const carregarPedidos = useCallback(async () => {
    const res = await fetch("http://localhost:8000/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPedidos(data);
  }, [token]);

  useEffect(() => {
    carregarPedidos();
  }, [carregarPedidos]);

  const fazerPedido = async () => {
    try {
      const res = await fetch("http://localhost:8000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ item_name: item, quantity: Number(quantidade) }),
      });

      if (!res.ok) {
        const erro = await res.json();
        throw new Error(erro.detail || "Erro ao fazer pedido");
      }

      setMsg("Pedido realizado com sucesso!");
      setItem("");
      setQuantidade("");
      carregarPedidos();
    } catch (error) {
      setMsg(error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Nome da peça"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={fazerPedido}
          className="bg-blue-700 text-white px-4 py-2 rounded"
        >
          Fazer Pedido
        </button>
      </div>

      {msg && <p className="mb-4">{msg}</p>}

      <div className="mb-4">
        <Link
          to="/catalogo"
          className="bg-blue-200 text-blue-800 px-4 py-2 rounded hover:bg-blue-300 font-semibold"
        >
          Ir para Catálogo
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-2">Pedidos realizados:</h2>
      <ul>
        {pedidos.map((p) => (
          <li key={p.id}>
            {p.item_name} - {p.quantity} unidades
          </li>
        ))}
      </ul>
    </div>
  );
}