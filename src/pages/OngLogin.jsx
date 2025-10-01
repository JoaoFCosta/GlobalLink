import React, { useState } from "react";
import LogedHeader from "../components/LogedHeader";
import { Link, useNavigate } from "react-router";

const OngLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("https://localhost:7226/api/Auth/OngLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("empresaLogada", JSON.stringify(data));
        alert(`Bem-vindo(a), ${data.nome}!`);
        navigate("/DashboardEmpresa");
      } else {
        const errorData = await response.json();
        alert(errorData || "Email ou senha inválidos. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao realizar o login:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <Link to="/" className="m-3 text-decoration-none">
          <i className="bi bi-arrow-left-short"></i> Voltar
        </Link>
        <LogedHeader />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="border rounded-4 bg-white p-4 d-flex text-center justify-content-center flex-column h-100 shadow-sm">
              <h2 className="text-primary fw-normal">Login - ONG</h2>
              <span className="text-secondary">
                Acesse sua conta para gerenciar ações e estoque
              </span>

              <form onSubmit={handleLogin} className="text-start mt-3">
                <span className="fw-bold">E-mail</span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-100 d-flex border-0 rounded-3 bg-secondary-subtle p-2 px-3 mb-4"
                />

                <span className="fw-bold">Senha</span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="w-100 d-flex border-0 rounded-3 bg-secondary-subtle p-2 px-3"
                />

                <button
                  type="submit"
                  className="btn btn-primary w-100 rounded-3 fw-medium mt-3"
                >
                  Entrar
                </button>
              </form>
              <p className="mt-3">
                Não tem uma conta?
                <Link to="/OngCadastro" className="text-decoration-none">
                  {" "}
                  Cadastre-se aqui
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OngLogin;
