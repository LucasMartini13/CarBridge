import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const produtos = [
  { id: 1, title: "Filtro de Óleo", img: "/Fotos-pecas/filtro-oleo-motor.jpeg", descricao: "Filtro para motor X, Y, Z." },
  // ...outros produtos...
];

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const produto = produtos.find(p => p.id === Number(id));
  if (!produto) return <Layout><p>Produto não encontrado.</p></Layout>;

  return (
    <Layout>
      <div className="p-8 flex flex-col items-center">
        <img src={produto.img} alt={produto.title} className="h-48 mb-6" />
        <h1 className="text-2xl font-bold mb-2">{produto.title}</h1>
        <p className="mb-4">{produto.descricao}</p>
        {/* ...botão para adicionar ao carrinho, etc... */}
      </div>
    </Layout>
  );
}