import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function Catalogo() {
  const [carrinho, setCarrinho] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const token = localStorage.getItem("token");

  const produtos = [
    { id: 1, title: "Filtro de Óleo", img: "/Fotos-pecas/filtro-oleo-motor.jpeg" },
    { id: 3, title: "Bateria", img: "/Fotos-pecas/bateria-automotiva.jpg" },
    { id: 4, title: "Filtro de Ar", img: "/Fotos-pecas/filtro-ar-motor.jpg" },
    { id: 5, title: "Velas de Ignição", img: "/Fotos-pecas/velas-motor.jpg" },
    { id: 6, title: "Pastilhas de Freio", img: "/Fotos-pecas/pastilha-freio.jpg" },
    { id: 7, title: "Discos de Freio", img: "/Fotos-pecas/disco-freio.jpg" },
    { id: 8, title: "Turbina", img: "/Fotos-pecas/turbo.jpg" },
  ];

  const handleQuantidadeChange = (id, value) => {
    setQuantidades({ ...quantidades, [id]: Number(value) });
  };

  const adicionarAoCarrinho = (produto) => {
    const quantidade = quantidades[produto.id] || 1;
    const idx = carrinho.findIndex((item) => item.nome === produto.title);
    if (idx !== -1) {
      const novoCarrinho = [...carrinho];
      novoCarrinho[idx].quantidade += quantidade;
      setCarrinho(novoCarrinho);
    } else {
      setCarrinho([...carrinho, { nome: produto.title, quantidade }]);
    }
  };

  const atualizarQuantidadeCarrinho = (idx, value) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho[idx].quantidade = Math.max(1, Number(value));
    setCarrinho(novoCarrinho);
  };

  const removerDoCarrinho = (idx) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(idx, 1);
    setCarrinho(novoCarrinho);
  };

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
    setMostrarCarrinho(false);
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
      <section
        className={`px-8 py-16 max-w-7xl mx-auto w-full transition-all duration-300 ${
          mostrarCarrinho ? "pr-[420px]" : ""
        }`}
      >
        <h2 className="text-4xl font-bold mb-12 text-center tracking-wide">
          Nossos Produtos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="card-produto rounded-2xl bg-white p-6 flex flex-col items-center cursor-pointer"
            >
              <Link to={`/produto/${produto.id}`}>
                <img src={produto.img} alt={produto.title} className="h-28 object-contain mb-6" />
                <span className="font-semibold text-center text-base">{produto.title}</span>
              </Link>
              <input
                type="number"
                min={1}
                value={quantidades[produto.id] || 1}
                onChange={(e) => handleQuantidadeChange(produto.id, e.target.value)}
                className="border rounded w-16 text-center mt-2"
              />
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

      <button
        onClick={() => setMostrarCarrinho(true)}
        className="fixed bottom-8 right-8 bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg z-50"
      >
        Ver Carrinho ({carrinho.length})
      </button>

      <div
        className={`fixed top-0 right-0 h-full z-50 transition-transform duration-300 ${
          mostrarCarrinho ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "100%", maxWidth: 400, pointerEvents: mostrarCarrinho ? "auto" : "none" }}
      >
        <div className="h-full bg-white shadow-2xl rounded-l-3xl p-8 overflow-y-auto relative">
          <button
            onClick={() => setMostrarCarrinho(false)}
            className="absolute top-2 right-4 text-2xl font-bold text-gray-500 hover:text-red-600"
          >
            ×
          </button>
          <h2 className="text-xl font-bold mb-4">Carrinho</h2>
          <ul>
            {carrinho.map((item, idx) => (
              <li key={idx} className="flex items-center mb-2">
                {item.nome} - 
                <input
                  type="number"
                  min={1}
                  value={item.quantidade}
                  onChange={e => atualizarQuantidadeCarrinho(idx, e.target.value)}
                  className="border rounded w-16 text-center mx-2"
                />
                unidade(s)
                <button
                  onClick={() => removerDoCarrinho(idx)}
                  className="ml-2 text-red-600 hover:underline"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          {carrinho.length > 0 && (
            <button
              onClick={finalizarPedido}
              className="bg-blue-700 text-white px-4 py-2 rounded mt-4"
            >
              Finalizar Pedido
            </button>
          )}
          {carrinho.length === 0 && (
            <p className="text-gray-500 mt-4">Seu carrinho está vazio.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}