import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LogedHeader from "../components/LogedHeader";

const DashboardOng = () => {
  const [ongLogada, setOngLogada] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se há uma ong logada
    const ong = JSON.parse(localStorage.getItem("ongLogada"));

    if (ong) {
      setOngLogada(ong);
    } else {
      // Se não há ong logada, redireciona para login
      navigate("/OngLogin");
    }
  }, [navigate]);

  const handleLogout = () => {
    const confirmar = window.confirm("Tem certeza que deseja sair da conta?");

    if (confirmar) {
      // Remove a sessão da ong
      localStorage.removeItem("ongLogada");

      // Redireciona para a página inicial
      navigate("/");
    }
  };

  if (!ongLogada) {
    return <div>Carregando...</div>;
  }
  return (
    <>
      <LogedHeader />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between rounded-3 align-items-center bg-white p-4 shadow-sm border-1">
              <div>
                <h3 className="mb-0">Bem-vindo(a), {ongLogada.nome}!</h3>
                <span>
                  {" "}
                  Encontre ONGs que precisam de ajuda e faça a diferença na sua
                  comunidade
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-outline-danger d-flex align-items-center"
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                <span className="d-none d-md-inline">Sair da Conta</span>
                <span className="d-md-none">Sair</span>
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 mt-3 bg-white p-4 shadow-sm rounded-3">
          <div className="d-flex">
            <i className="bi bi-eye fs-5 me-2"></i>
            <h4>Monitoramento de pessoas com IA</h4>
          </div>
          <p>Sistema de contagem inteligente com câmera e IA</p>
          <div className="justify-content-center text-center">
            <i className="bi bi-people fs-1"></i>
            <span className="fs-1 fw-bolder">12</span>
            <p>Pessoas no local agora</p>
            <div className="d-flex justify-content-center">
              <div className="col-4 border border-1 rounded-3">
                <p className="fs-4 fw-medium text-start p-3 text-success">
                  Entradas
                </p>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <div className="col-4 border border-1 rounded-3">
                <p className="fs-4 fw-medium text-start p-3 text-success">
                  Entradas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardOng;
