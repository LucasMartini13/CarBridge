import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../estilo-css/AutoPartsHome.css';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const isLogged = !!localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const userType = localStorage.getItem("userType");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

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
        <Link to="/" style={{ fontWeight: "bold", fontSize: "1.5rem", color: "white", textDecoration: "none" }}>
          CarBridge
        </Link>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "1rem" }}>
          <Link to="/catalogo" style={{ color: "white", textDecoration: "none", cursor: "pointer" }}>PRODUTOS</Link>
          <Link to="/contato" style={{ color: "white", textDecoration: "none", cursor: "pointer" }}>CONTATO</Link>
          <Link to="/rastreio" style={{ color: "white", textDecoration: "none", cursor: "pointer" }}>RASTREIO</Link>
          {isLogged && userType === "admin" && (
            <Link to="/estoque" style={{ color: "white", textDecoration: "none", cursor: "pointer" }}>ESTOQUE</Link>
          )}
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          {isLogged && (
            <span style={{ marginRight: "1rem", fontWeight: "bold" }}>
              Olá, {username}
            </span>
          )}
          {isLogged ? (
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "transparent",
                border: "1.5px solid white",
                color: "white",
                padding: "0.5rem 1.25rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.9rem",
                transition: "background-color 0.3s ease",
                textAlign: "center"
              }}
            >
              Sair
            </button>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>

      <main className="flex-grow flex flex-col">
        {children}
      </main>

      <footer className="bg-gray-100 px-8 py-16 text-center">
        <nav style={{
          backgroundColor: "#111827",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          position: "relative"
        }}>
        <p className="mb-8 max-w-xl mx-auto text-gray-700">
            Entre em contato conosco para mais informações sobre nossos produtos e serviços.
        </p>
          <div style={{ display: "flex", gap: "1.5rem", fontSize: "2rem" }}>
            <Link to="/contato" style={{
            backgroundColor: "#111827",
            border: "1.5px solid white",
            color: "white",
            padding: "0.5rem 1.25rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.9rem",
            transition: "background-color 0.3s ease",
            textAlign: "center",
          }}>Fale Conosco</Link>
        </div>
        </nav>
      </footer>
    </div>
  );
}