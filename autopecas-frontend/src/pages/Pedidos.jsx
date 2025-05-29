import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [msg, setMsg] = useState("");
  const token = localStorage.getItem("token");

  const carregarPedidos = async () => {
    try {
      const res = await fetch("http://localhost:8000/orders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Erro ao buscar pedidos");
      const data = await res.json();
      setPedidos(data);
    } catch (error) {
      setMsg(error.message);
    }
  };

  useEffect(() => {
    carregarPedidos();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Meus Pedidos</h1>
        {msg && <div className="mb-4 text-red-600">{msg}</div>}
        {pedidos.length === 0 ? (
          <p className="text-gray-500">Nenhum pedido encontrado.</p>
        ) : (
          <ul className="space-y-8">
            {pedidos.map((pedido) => (
              <li
                key={pedido.id}
                className="border rounded-lg p-4 bg-white shadow"
              >
                <div className="font-semibold mb-2">
                  Pedido #{pedido.id} -{" "}
                  {pedido.created_at
                    ? new Date(pedido.created_at).toLocaleString()
                    : "Data não informada"}
                </div>
                <div>
                  Status:{" "}
                  <span className="font-semibold">
                    {pedido.status || "Pendente"}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="font-semibold">Itens:</span>
                  <ul className="ml-4 list-disc">
                    {pedido.itens && pedido.itens.length > 0 ? (
                      pedido.itens.map((item, idx) => (
                        <li key={idx}>
                          {item.item_name} - {item.quantity} unidade(s)
                        </li>
                      ))
                    ) : (
                      <li>Nenhum item neste pedido.</li>
                    )}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}