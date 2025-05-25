import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Usuário ou senha incorretos");
      }

      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      setErro("");
      navigate("/pedidos");
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <Layout>
      <main className="flex-grow flex flex-col justify-center items-center bg-gray-100">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mt-12">
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition transform hover:scale-105 duration-300 w-full mt-2"
          >
            Entrar
          </button>
          {erro && <p className="text-red-500 mt-2">{erro}</p>}
          <Link
            to="/"
            className="block mt-6 text-center text-blue-700 hover:underline font-semibold"
          >
            Voltar para Home
          </Link>
        </div>
      </main>
    </Layout>
  );
}