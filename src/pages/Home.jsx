import React from "react";
import Header from "../components/Header";
import { Link } from "react-router";
import Logo from "../assets/logo.png"

const Home = () => {
  return (
    <div>
      <Header />

      <div className="container mt-5">
        <h1 className="text-center text-success fw-semibold"><i className="bi bi-globe text-primary">Global</i>Link</h1>
        <p className="fs-5 text-center">Escolha seu tipo de usuário</p>
      </div>

      <div className="container">
        <div className="row justify-content-center g-4">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="border rounded-4 bg-white p-4 d-flex text-center justify-content-center flex-column h-100 shadow-sm">
              <i className="bi bi-suit-heart fs-3 text-primary mb-2"></i>
              <span className="fs-2 text-primary">Sou uma ONG</span>
              <span>Organização Não Governamental</span>
              <span className="text-secondary mt-3">
                Monitore doações e estoques em tempo real,<br className="d-none d-md-block" /> gerencie necessidades da sua comunidade.
              </span>
              <ul className="mt-4 text-secondary text-start mx-auto">
                <li>Monitoramento IoT em tempo real</li>
                <li>Calculadora de necessidades</li>
                <li>Gestão de doadores</li>
                <li>Relatórios de impacto</li>
              </ul>
              <Link to="/OngLogin" className="mt-4">
                <button className="btn btn-primary w-100 fw-semibold">
                  Continuar como ONG
                </button>
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-5">
            <div className="border rounded-4 bg-white p-4 d-flex text-center justify-content-center flex-column h-100 shadow-sm">
              <i className="bi bi-building fs-3 text-success mb-2"></i>
              <span className="fs-2 text-success">Sou uma Empresa</span>
              <span>Empresa Doadora</span>
              <span className="text-secondary mt-3">
                Encontre ONGs que precisam de ajuda e faça<br className="d-none d-md-block" /> doações com incentivos fiscais.
              </span>
              <ul className="mt-4 text-secondary text-start mx-auto">
                <li>Encontrar ONGs próximas</li>
                <li>Doações com incentivos fiscais</li>
                <li>Responsabilidade social</li>
                <li>Certificados de doação</li>
              </ul>
              <Link to="/EmpresaLogin" className="mt-4">
                <button className="btn btn-success w-100 fw-semibold">
                  Continuar como Empresa
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center mt-5 px-3">Conectando doadores e ONGs para um mundo melhor</p>
    </div>
  );
};

export default Home;
