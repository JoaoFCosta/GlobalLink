import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMqtt } from "../hooks/useMqtt";
import LogedHeader from "../components/LogedHeader";
import Cam from "../assets/cam.jpg";

const DashboardOng = () => {
  const [empresas, setEmpresas] = useState([]);
  const [totalEmpresas, setTotalEmpresas] = useState(0);
  const [ongLogada, setOngLogada] = useState("");
  const [loading, setLoading] = useState(true);

  const [doacoes, setDoacoes] = useState([]);
  const [totalDoacoes, setTotalDoacoes] = useState(0);

  const navigate = useNavigate();

  const brokerHost = "broker.hivemq.com";
  const brokerPort = 8000;
  const topic = "caminhao/status";

  const { weight, distance, status, lastUpdate, isConnected } = useMqtt(
    brokerHost,
    brokerPort,
    topic
  );

  const carregarDoacoes = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5102/api/Donates");
      if (!response.ok)
        throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);

      const data = await response.json();
      setDoacoes(data);
      setTotalDoacoes(Array.isArray(data) ? data.length : 0);
      console.log("✅ Doações carregadas:", data);
    } catch (err) {
      console.error("❌ Erro ao buscar doações:", err);
      setTotalDoacoes(0);
      setDoacoes([]);
    } finally {
      setLoading(false);
    }
  };

  const carregarEmpresas = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5102/api/Companies");
      if (!response.ok)
        throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);

      const data = await response.json();
      setEmpresas(data);
      setTotalEmpresas(Array.isArray(data) ? data.length : 0);
      console.log("✅ Empresas carregadas:", data);
    } catch (err) {
      console.error("❌ Erro ao buscar empresas:", err);
      setTotalEmpresas(0);
      setEmpresas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDoacoes();
    carregarEmpresas();
  }, []);

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
                <h3 className="mb-0">Bem-vindo(a)!</h3>
                <span> Acompanhe suas doações e estoques em tempo real</span>
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
          <div className="d-flex mt-4">
            <i className="bi bi-eye fs-5 me-2"></i>
            <h4>Atividade recente</h4>
          </div>
          <p>Nenhuma atividade recente</p>
        </div>

        <div className="col-12 mt-3 bg-white p-4 shadow-sm rounded-3 mb-3">
          <div className="d-flex">
            <i className="bi bi-eye fs-5 me-2"></i>
            <h4>Monitoramento IoT em Tempo Real</h4>
          </div>
          <p>Dados dos sensores ESP32 para controle de estoque</p>
          <div className="d-flex flex-column flex-md-row justify-content-center gap-3 gap-md-5">
            <div
              className="col-12 col-md-3 border border-1 rounded-3"
              style={{ height: "240px" }}
            >
              <p className="fs-4 fw-medium text-start p-3">Peso atual</p>
              <p className="text-start mx-5 fw-bolder fs-4">
                {weight ? `${weight} t` : "--"}
              </p>
              <small className="text-start p-3">
                Última leitura do sensor HX711
              </small>
            </div>

            <div className="col-12 col-md-3 border border-1 rounded-3">
              <p className="fs-4 fw-medium text-start p-3">
                Distância do sensor
              </p>
              <p className="text-start mx-5 fw-bolder fs-4">
                {distance ? `${distance} m` : "--"}
              </p>
              <small className="text-start p-3">
                Sensor ultrassônico HC-SR04
              </small>
            </div>

            <div className="col-12 col-md-3 border border-1 rounded-3">
              <p className="fs-4 fw-medium text-start p-3">
                Status do caminhão
              </p>
              <p className="text-start mx-5 fw-bolder fs-4">{status}</p>
            </div>
          </div>

          <div className="container d-flex justify-content-center align-items-center">
            <div className="col-11 col-md-12 border border-1 mt-3 p-3 rounded-3">
              <p>Informações Técnicas do ESP32</p>
              <div className="d-flex flex-column flex-md-row text-center gap-3 gap-md-5">
                <p>
                  <strong>Sensor de Peso</strong> <br /> HX711 - Pinos DT:18,
                  SCK:19
                </p>
                <p>
                  <strong>Sensor de Distância</strong> <br /> HC-SR04 - Pinos
                  TRIG:22, ECHO:23
                </p>
                <p>
                  <strong>Comunicação Serial</strong> <br /> USB / WiFi
                </p>
                <p>
                  <strong>Frequência</strong> <br /> Atualização a cada 2s
                </p>
              </div>
              <div className="mt-3">
                Última leitura:{" "}
                {lastUpdate ? lastUpdate.toLocaleString() : "Sem leituras"}
              </div>
              <div className="mt-1">
                Conexão MQTT: {isConnected ? "✅ Online" : "❌ Offline"}
              </div>
            </div>
          </div>

          <div className="d-flex gap-md-5 justify-content-center align-items-center mb-3">
            <div className="col-12 col-md-5 border border-1 mt-3 p-3 rounded-3">
              <p className="fs-5 fw-semibold">
                Empresas doadoras <i class="bi bi-building"></i>
              </p>
              <span className="fs-2 fw-bolder">{totalEmpresas}</span>
              <br />
              <small>Empresas Ativas</small>
            </div>

            <div className="col-12 col-md-5 border border-1 mt-3 p-3 rounded-3">
              <p className="fs-5 fw-semibold">Doações recebidas <i class="bi bi-gift"></i></p>
              <span className="fs-2 fw-bolder">{totalDoacoes}</span>
              <br />
              <small>Doações nas últimas semanas</small>
            </div>
          </div>
          <div className="col-12 container border border-1 mt-3 p-3 rounded-3">
            <p className="fs-5 fw-semibold"><i class="bi bi-box-seam"></i> Necessidades</p>
            <small>Gerencie as necessidades detalhadas da sua organização</small>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <Link to="/Alerts" className="btn btn-primary fw-medium">
              Alertas e necessidades
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardOng;
