import React from "react";
import Layout from "../components/Layout";

export default function AutoPartsHome() {
  return (
    <Layout>
      <header className="hero-section bg-gray-100 p-12 text-center flex-grow flex flex-col justify-center">
        <h1 className="text-5xl font-extrabold mb-6 tracking-wide leading-tight">
          AUTO PARTS DISTRIBUTOR
        </h1>
        <p className="text-lg max-w-xl mx-auto mb-8 text-gray-700">
          Sua fonte de peças de reposição de qualidade para sua oficina.
        </p>
        <button className="btn-destaque mx-auto">
          Ver Produtos
        </button>
      </header>
      <section className="px-8 py-16 max-w-7xl mx-auto w-full">
        <h2 className="text-4xl font-bold mb-12 text-center tracking-wide">
          NOSSOS PRODUTOS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { title: "Motores", img: "/img/engine_parts.png" },
            { title: "Sistema de freio", img: "/img/brake_system.png" },
            { title: "Suspensao", img: "/img/suspension.png" },
            { title: "Eletrica", img: "/img/electrical.png" },
          ].map(({ title, img }) => (
            <div
              key={title}
              className="card-produto rounded-2xl bg-white p-6 flex flex-col items-center cursor-pointer"
            >
              <img src={img} alt={title} className="h-28 object-contain mb-6" />
              <span className="font-semibold text-center text-base">{title}</span>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}