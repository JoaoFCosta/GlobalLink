import React, { useState } from "react";
import LogedHeader from "../components/LogedHeader";
import { Link, useNavigate } from "react-router";

const EmpresaLogin = () => {
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
      const response = await fetch(
        "http://localhost:5102/api/Auth/CompanyLogin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha: password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData || "Email ou senha inválidos. Tente novamente.");
        return;
      }

      const authData = await response.json();
      console.log("Resposta de autenticação:", authData);

      // Se o backend retornar um token, gravamos para uso posterior
      const token = authData.token || authData.accessToken || null;
      if (token) {
        localStorage.setItem("empresaToken", token);
      }

      let empresaCompleta = authData;

      try {
        // Se o authData contiver um id, buscamos diretamente por id (mais eficiente)
        if (authData.id) {
          const companyByIdUrl = `http://localhost:5102/api/Companies/${authData.id}`;
          const res = await fetch(companyByIdUrl, {
            method: "GET",
            headers: token
              ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
              : { "Content-Type": "application/json" },
          });

          if (res.ok) {
            const companyData = await res.json();
            empresaCompleta = companyData || empresaCompleta;
          }
        } else {
          // fallback: busca lista e tenta encontrar pelo email
          const companiesUrl = "http://localhost:5102/api/Companies";
          const companiesRes = await fetch(companiesUrl, {
            method: "GET",
            headers: token
              ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
              : { "Content-Type": "application/json" },
          });

          if (companiesRes.ok) {
            const companies = await companiesRes.json();
            const found = (Array.isArray(companies) ? companies : [])
              .find((c) => c.email && authData.email && c.email.toLowerCase() === authData.email.toLowerCase());

            if (found) {
              empresaCompleta = found;
            }
          }
        }
      } catch (err) {
        console.warn("Não foi possível buscar dados completos da empresa:", err);
      }

      // Salva o objeto completo (ou pelo menos o retorno do login)
      localStorage.setItem("empresaLogada", JSON.stringify(empresaCompleta));
      alert(`Bem-vindo(a), ${empresaCompleta.nome || empresaCompleta.Nome || email}!`);
      navigate("/DashboardEmpresa");
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
