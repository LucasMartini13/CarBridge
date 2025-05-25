import React, { useState } from "react";
import "../estilo-css/Cadastro.css"; // Importando o CSS para estilização
import { Link, useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async () => {
    if (!username || !password) {
      setErro("Preencha todos os campos");
      setSucesso("");
      return;
    }

    setErro("");
    setSucesso("");

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Erro ao cadastrar usuário");
      }

      setSucesso("Cadastro realizado com sucesso! Redirecionando para login...");
      setUsername("");
      setPassword("");
      setTimeout(() => navigate("/login"), 2500);
    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">

        {/* Formulário de Cadastro */}
        <div className="cadastro-form">
          <h1 className="cadastro-title">Cadastro</h1>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button
            onClick={handleCadastro}
            className="cadastro-button"
          >
            Cadastrar
          </button>
          {erro && <p className="error-text">{erro}</p>}
          {sucesso && <p className="success-text">{sucesso}</p>}
        </div>

        {/* Sobreposição decorativa */}
        <div className="cadastro-overlay">
          <h2 className="overlay-title">Bem-vindo!</h2>
          <p className="overlay-text">Crie sua conta para continuar</p>
        </div>
      </div>

      {/* Link para voltar para a página inicial */}
      <div className="volta-home">
        <Link
          to="/"
          className="voltar-login-cadastro-link"
        >
          Voltar para Página Inicial
        </Link>
      </div>
    </div>
  );
}