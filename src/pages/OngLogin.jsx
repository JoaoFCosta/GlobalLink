import React from "react";
import LogedHeader from "../components/LogedHeader";
import { Link } from "react-router";

const OngLogin = () => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <Link to="/" className="m-3 text-decoration-none">
          <i class="bi bi-arrow-left-short"></i> Voltar
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

              <div className="text-start mt-3">
                <span className="fw-bold">E-mail</span>
                <input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  className="w-100 d-flex border-0 rounded-3 bg-secondary-subtle p-2 px-3 mb-4"
                />

                <span className="fw-bold">Senha</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Sua senha"
                  className="w-100 d-flex border-0 rounded-3 bg-secondary-subtle p-2 px-3"
                />
              </div>
              <Link to="/" className="mt-3">
                <button className="btn btn-primary w-100 rounded-3 fw-medium">
                  Entrar
                </button>
              </Link>

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
