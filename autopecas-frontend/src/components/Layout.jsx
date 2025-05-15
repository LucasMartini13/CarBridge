import React from "react";
import { Link } from "react-router-dom";
import '../pages/AutoPartsHome.css';

export default function Layout({ children }) {
  return (
    <div className="bg-site text-gray-800 font-sans min-h-screen flex flex-col">
      {/* Navbar */}
      <nav style={{
        backgroundColor: "#111827",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        position: "relative"
      }}>
        <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          AUTO PARTS
        </div>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "1rem" }}>
          <Link to="/produtos" style={{ color: "white", textDecoration: "none", cursor: "pointer" }}>PRODUCTS</Link>
          <Link to="/contato" style={{ color: "white", textDecoration: "none", cursor: "pointer" }}>CONTACT</Link>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to="/login" style={{
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
            Login
          </Link>
          <Link to="/cadastro" style={{
            backgroundColor: "white",
            border: "none",
            color: "#111827",
            padding: "0.5rem 1.25rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.9rem",
            transition: "background-color 0.3s ease",
            textAlign: "center",
            textDecoration: "none"
          }}>
            Cadastro
          </Link>
        </div>
      </nav>

      {/* Conteúdo da página */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Rodapé */}
      <footer className="bg-gray-100 px-8 py-16 text-center">
        <h3 className="text-3xl font-bold mb-6 tracking-wide">Entre em contato com nos</h3>
        <p className="mb-8 max-w-xl mx-auto text-gray-700">
            Entre em contato conosco para mais informações sobre nossos produtos e serviços.
        </p>
        <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition transform hover:scale-105 duration-300">
            Fale Conosco
        </button>
      </footer>
    </div>
  );
}