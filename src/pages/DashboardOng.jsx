import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import LogedHeader from "../components/LogedHeader";
import Cam from "../assets/cam.jpg";

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
            <div className="d-flex flex-column flex-md-row justify-content-between rounded-3 align-items-start align-items-md-center bg-white p-4 shadow-sm border-1">
              <div className="mb-3 mb-md-0">
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
            <div className="d-flex flex-column flex-lg-row justify-content-center gap-3 gap-lg-5">
              <img
                src={Cam}
                alt=""
                className="rounded-3 img-fluid"
                style={{ maxWidth: "400px" }}
              />
              <div className="col-12 col-lg-3 border border-1 rounded-3">
                <p className="fs-4 fw-medium text-start p-3 text-success">
                  Entradas
                </p>
                <p className="text-start mx-5 fw-bolder fs-4">19</p>
                <p className="text-start p-3">Hoje</p>
              </div>

              <div className="col-12 col-lg-3 border border-1 rounded-3">
                <p className="fs-4 fw-medium text-start p-3 text-danger">
                  Saídas
                </p>
                <p className="text-start mx-5 fw-bolder fs-4">20</p>
                <p className="text-start p-3">Hoje</p>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <i className="bi bi-eye fs-5 me-2"></i>
            <h4>Atividade recente</h4>
          </div>
          <p>Nenhuma atividade recente</p>
        </div>

        <div className="col-12 mt-3 bg-white p-4 shadow-sm rounded-3">
          <div className="d-flex">
            <i className="bi bi-eye fs-5 me-2"></i>
            <h4>Monitoramento IoT em Tempo Real</h4>
          </div>
          <p>Dados dos sensores ESP32 para controle de estoque</p>
          <div className="d-flex flex-column flex-md-row gap-3 gap-md-5 justify-content-center">
            <div className="col-12 col-md-3 border border-1 rounded-3">
              <p className="fs-4 fw-medium text-start p-3">Peso atual</p>
              <p className="text-start mx-5 fw-bolder fs-4">3.34t</p>
              <p className="text-start p-3">Última leitura do sensor HX711</p>
            </div>

            <div className="col-12 col-md-3 border border-1 rounded-3">
              <p className="fs-4 fw-medium text-start p-3">
                Distância do sensor
              </p>
              <p className="text-start mx-5 fw-bolder fs-4">3.4m</p>
              <p className="text-start p-3">Sensor ultrassônico HC-SR04</p>
            </div>

            <div className="col-12 col-md-3 border border-1 rounded-3">
              <p className="fs-4 fw-medium text-start p-3">
                Status do caminhão
              </p>
              <p className="text-start mx-5 fw-bolder fs-4">Chegando</p>
            </div>
          </div>

          <div className="border border-1 mt-5 p-3 rounded-3">
            <p>Informações Técnicas do ESP32</p>

            <div className="d-flex flex-column flex-md-row gap-3 gap-md-5">
              <p>
                Sensor de Peso <br /> HX711 - Pinos DT:18, SCK:19
              </p>
              <p>
                Sensor de Distância <br /> HC-SR04 - Pinos TRIG:22, ECHO:23
              </p>
              <p>
                Comunicação Serial <br /> USB / WiFi
              </p>
              <p>
                Frequência <br /> Atualização a cada 2s
              </p>
            </div>
            <span>Última leitura: 17/09/2025, 16:05:00</span>
          </div>
        </div>

        <div className="col-12 mt-3 bg-white p-4 shadow-sm rounded-3 mb-5">
          <div className="d-flex flex-column flex-md-row gap-3 gap-md-5 justify-content-center">
            <div className="col-12 col-md-3 border border-1 rounded-3">
              <p className="fs-4 fw-medium text-start p-3">Pessoas atendidas</p>
              <p className="text-start mx-5 fw-bolder fs-4">12</p>
              <p className="text-start p-3">Pessoas por dia</p>
            </div>

            <div className="col-12 col-md-3 border border-1 rounded-3">
              <p className="fs-4 fw-medium text-start p-3">
                Status de necessidade
              </p>
              <p className="text-start mx-5 fw-bolder fs-4">🟢 Estável</p>
              <p className="text-start p-3">Baseado no público atendido</p>
            </div>

            <div className="col-12 col-md-3 border border-1 rounded-3">
              <p className="fs-4 fw-medium text-start p-3">Doações</p>
              <p className="text-start mx-5 fw-bolder fs-4">2</p>
              <p className="text-start p-3">Recebidas hoje</p>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <Link to="/" className="btn btn-primary fw-medium">
              Alertas
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardOng;
