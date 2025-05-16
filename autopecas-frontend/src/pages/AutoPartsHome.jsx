import React from "react";
import Layout from "../components/Layout";

export default function AutoPartsHome() {
  return (
    <Layout>
      <header className="hero-section bg-gray-100 p-12 text-center flex-grow flex flex-col justify-center">
        <div style={{ display: "flex", gap: "1rem",
            backgroundColor: "transparent",
            border: "1.5px solid white",
            color: "white",
            padding: "0.5rem 1.25rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.9rem",
            transition: "background-color 0.3s ease",
            textAlign: "center",
            textDecoration: "none"
          }}>
        </div>
        <p className="text-lg max-w-xl mx-auto mb-8 text-gray-700">
          Sua fonte de peças de reposição de qualidade para sua oficina.
        </p>
      </header>
      <section className="px-8 py-16 max-w-7xl mx-auto w-full">
        <h2 className="text-4xl font-bold mb-12 text-center tracking-wide">
          Nossos Produtos
        </h2>
      </section>
    </Layout>
  );
}