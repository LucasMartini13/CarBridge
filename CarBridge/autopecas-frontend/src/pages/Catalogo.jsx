import React, { useState } from "react";
import Layout from "../components/Layout";

export default function Catalogo() {
  const [carrinho, setCarrinho] = useState([]);
  const token = localStorage.getItem("token");

  // Produtos disponíveis
  const produtos = [
    { title: "Motores", img: "/img/catalogo-carreta.webp" },
    // Adicione mais produtos aqui se quiser
  ];

  // Adiciona produto ao carrinho
  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, { nome: produto.title, quantidade: 1 }]);
  };

  // Finaliza o pedido
  const finalizarPedido = async () => {
    for (const item of carrinho) {
      await fetch("http://localhost:8000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ item_name: item.nome, quantity: item.quantidade }),
      });
    }
    setCarrinho([]);
    alert("Pedido realizado com sucesso!");
  };

  return (
    <Layout>
      <header className="hero-section bg-gray-100 p-12 text-center flex-grow flex flex-col justify-center">
        <h1 className="text-5xl font-extrabold mb-6 tracking-wide leading-tight">
          CarBridge
        </h1>
        <p className="text-lg max-w-xl mx-auto mb-8 text-gray-700">
          Sua fonte de peças de reposição de qualidade para sua oficina.
        </p>
      </header>
      <section className="px-8 py-16 max-w-7xl mx-auto w-full">
        <h2 className="text-4xl font-bold mb-12 text-center tracking-wide">
          Nossos Produtos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {produtos.map((produto) => (
            <div
              key={produto.title}
              className="card-produto rounded-2xl bg-white p-6 flex flex-col items-center cursor-pointer"
            >
              <img src={produto.img} alt={produto.title} className="h-28 object-contain mb-6" />
              <span className="font-semibold text-center text-base">{produto.title}</span>
              <button
                onClick={() => adicionarAoCarrinho(produto)}
                className="bg-green-600 text-white px-2 py-1 rounded ml-2 mt-2"
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))}
        </div>
      </section>
      <div className="max-w-2xl mx-auto my-8 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Carrinho</h2>
        <ul>
          {carrinho.map((item, idx) => (
            <li key={idx}>{item.nome} - {item.quantidade} unidade(s)</li>
          ))}
        </ul>
        {carrinho.length > 0 && (
          <button
            onClick={finalizarPedido}
            className="bg-blue-700 text-white px-4 py-2 rounded mt-2"
          >
            Finalizar Pedido
          </button>
        )}
      </div>
    </Layout>
  );
}