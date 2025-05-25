import React, { useEffect, useState } from "react";

export default function Estoque() {
  const [estoque, setEstoque] = useState([]);
  const [partName, setPartName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");

  const carregarEstoque = async () => {
    const res = await fetch("http://localhost:8000/stock", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setEstoque(data);
  };

  useEffect(() => {
    carregarEstoque();
  }, []);

  const adicionarEstoque = async () => {
    try {
      const res = await fetch("http://localhost:8000/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          part_name: partName,
          quantity: Number(quantity),
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao adicionar estoque");
      }

      setMsg("Estoque atualizado com sucesso");
      setPartName("");
      setQuantity("");
      carregarEstoque();
    } catch (error) {
      setMsg(error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestão de Estoque</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Nome da peça"
          value={partName}
          onChange={(e) => setPartName(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={adicionarEstoque}
          className="bg-blue-700 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </div>

      {msg && <p className="mb-4 text-green-600">{msg}</p>}

      <h2 className="text-xl font-semibold mb-2">Peças no Estoque:</h2>
      <ul>
        {estoque.map((item) => (
          <li key={item.id}>
            {item.part_name} - {item.quantity} unidades
          </li>
        ))}
      </ul>
    </div>
  );
}