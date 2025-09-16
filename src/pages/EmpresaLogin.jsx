import React, { useState } from "react";
import LogedHeader from "../components/LogedHeader";
import { Link, useNavigate } from "react-router";

const EmpresaLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validação simples
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      // Pega empresas salvas no localStorage
      const empresasSalvas = JSON.parse(localStorage.getItem("empresas")) || [];

      // Procura a empresa com email e senha correspondentes
      const empresaEncontrada = empresasSalvas.find(
        (empresa) => empresa.email === email && empresa.password === password
      );

      if (empresaEncontrada) {
        // Salva a sessão da empresa logada
        localStorage.setItem(
          "empresaLogada",
          JSON.stringify(empresaEncontrada)
        );

        alert(`Bem-vindo(a), ${empresaEncontrada.nome}!`);

        // Resetar os campos
        setEmail("");
        setPassword("");

        // Redireciona para o dashboard
        navigate("/DashboardEmpresa");
      } else {
        alert("E-mail ou senha incorretos!");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao fazer login.");
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
              <h2 className="text-success fw-normal">Login - Empresa</h2>
              <span className="text-secondary">
                Acesse sua conta para encontrar ONGs e fazer doações
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
                  required
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
                  required
                />

                <button
                  type="submit"
                  className="btn btn-success w-100 rounded-3 fw-medium mt-5"
                >
                  Entrar
                </button>
              </form>

              <p className="mt-3">
                Não tem uma conta?
                <Link to="/EmpresaCadastro" className="text-decoration-none ">
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

export default EmpresaLogin;
