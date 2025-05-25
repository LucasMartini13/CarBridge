import React, { useState } from "react";
import "../estilo-css/Login.css"; // Importando o CSS para estilização
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setErro("Preencha todos os campos");
      return;
    }

    setErro("");

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Erro ao fazer login");
      }

      const data = await res.json();
      localStorage.setItem("token", data.access_token);

      navigate("/pedidos");
    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        {/* Formulário de Login */}
        <div className="login-form">
          <h1 className="login-title">Login</h1>
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
            onClick={handleLogin}
            className="login-button"
          >
            Entrar
          </button>
          {erro && <p className="error-text">{erro}</p>}
        </div>

        {/* Sobreposição decorativa */}
        <div className="login-overlay">
          <h2 className="overlay-title">Bem-vindo!</h2>
          <p className="overlay-text">Acesse sua conta para continuar</p>
        </div>
      </div>

        {/* Link para voltar para a página inicial */}
      <div className="volta-cadastro">
        <Link
          to="/cadastro"
          className="Cadastro"
        >
          Cadastro
        </Link>
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