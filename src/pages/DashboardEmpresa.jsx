import React, { useEffect, useState } from "react";
import LogedHeader from "../components/LogedHeader";
import { Link, useNavigate } from "react-router";

const DashboardEmpresa = () => {
  const [empresaLogada, setEmpresaLogada] = useState(null);
  const [totalOngs, setTotalOngs] = useState(0);
  const [ongs, setOngs] = useState([]);
  const [totalNeeds, setTotalNeeds] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const dados = localStorage.getItem("empresaLogada");
    if (dados) {
      setEmpresaLogada(JSON.parse(dados));
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:5102/api/Ongs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar ONGs");
        }
        return response.json();
      })
      .then((data) => {
        setTotalOngs(data.length);
        setOngs(data); // adiciona esta linha
      })
      .catch((error) => {
        console.error("Erro ao buscar as ONGs:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5102/api/Needs")
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar necessidades");
        return response.json();
      })
      .then((data) => {
        setTotalNeeds(data.length); // total de necessidades cadastradas
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    const confirmar = window.confirm("Tem certeza que deseja sair da conta?");

    if (confirmar) {
      // Remove a sessão da empresa
      localStorage.removeItem("empresaLogada");

      // Redireciona para a página inicial
      navigate("/");
    }
  };

  if (!empresaLogada) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <LogedHeader />

      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center bg-white p-4 shadow-sm border-1">
              <div>
                <h3 className="mb-0">Bem-vindo(a)!</h3>
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
            <div className="row mt-4">
              <div className="col-12">
                <div className="container-fluid">
                  <div className="row g-3">
                    <div className="col-12 col-sm-6 col-lg-6">
                      <div className="border p-3 p-md-4 rounded-3 bg-white h-100 shadow-sm">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-bold fs-6 fs-md-5">
                            ONGs disponíveis
                          </span>
                          <i className="bi bi-suit-heart text-secondary fs-4"></i>
                        </div>
                        <p className="fs-2 fs-md-1 fw-bold mb-1">{totalOngs}</p>
                        <small>Organizações cadastradas</small>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-6">
                      <div className="border p-3 p-md-4 rounded-3 bg-white h-100 shadow-sm">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-bold fs-6 fs-md-5">
                            Necessidades
                          </span>
                          <i className="bi bi-gift text-success fs-4"></i>
                        </div>
                        <p className="fs-2 fs-md-1 fw-bold text-success mb-1">
                          {totalNeeds}
                        </p>
                        <small>Necessidades pendentes</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 mt-4">
                <div className="border border-1 border-primary rounded-3 p-3 p-md-4 bg-white">
                  <div className="row align-items-center g-3">
                    <div className="col-12 col-md-2 text-center text-md-start">
                      <i className="bi bi-box-seam text-primary fs-1"></i>
                    </div>

                    <div className="col-12 col-md-7">
                      <h4 className="text-primary fw-bold mb-2">
                        Oportunidades de doações específicas
                      </h4>
                      <p className="text-primary mb-2">
                        Veja necessidades detalhadas das ONGs e faça doações
                        direcionadas com maior impacto social
                      </p>
                      <div className="text-primary">
                        <small className="d-block d-sm-inline me-sm-3">
                          ✓ Necessidades específicas por item
                        </small>
                        <small className="d-block d-sm-inline me-sm-3">
                          ✓ Rastreamento de progresso
                        </small>
                        <small className="d-block d-sm-inline">
                          ✓ Doações direcionadas
                        </small>
                      </div>
                    </div>

                    <div className="col-12 col-md-3 text-center text-md-end">
                      <Link to="/Doacoes" className="btn btn-primary px-4 py-2">
                        <i className="bi bi-gift me-2"></i>
                        <span className="d-none d-sm-inline">
                          Ver oportunidades
                        </span>
                        <span className="d-sm-none">Ver mais</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 mt-4">
                <div className="bg-white border border-1 border-white p-3 rounded-3">
                  <span>
                    <i className="bi bi-suit-heart fs-3"></i>
                  </span>
                  <span className="ms-2 fs-4 fw-medium">
                    ONGs que precisam de ajuda
                  </span>
                  <br />
                  <small>
                    Organizações ordenadas por urgência ou proximidade
                  </small>

                  <div className="col-12 mt-4 border border-1 p-4 rounded-3">
                    <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between mb-2">
                      <div className="w-100 row g-2 g-md-3">
                        {ongs.length === 0 ? (
                          <p>Nenhuma ONG cadastrada.</p>
                        ) : (
                          ongs.map((ong) => (
                            <div
                              key={ong.id}
                              className="bg-white border p-3 rounded-3 mb-3 shadow-sm"
                            >
                              <h5 className="fw-bold mb-1">{ong.ongNome}</h5>
                              <p className="mb-1">
                                {ong.ongBairro}, {ong.ongRua}, {ong.ongNumero}
                              </p>

                              <p className="mb-1">
                              <strong>Caixa Postal:</strong> {ong.ongCep}
                              </p>

                              <p className="mb-1">
                                <strong>Contato:</strong> {ong.ongTelefone}
                              </p>
                            </div>
                          ))

                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white mt-4 p-3 p-md-4 rounded-3 border">
                  <div className="mb-3">
                    <span className="fw-bolder fs-5">
                      <i className="bi bi-box-seam me-2"></i>Histórico de
                      doações
                    </span>
                    <br />
                    <small>Suas doações realizadas recentemente</small>
                  </div>
                </div>

                <div className="bg-white mt-4 p-3 p-md-4 mb-5 rounded-3 border">
                  <div className="row align-items-center">
                    <div className="col-12 col-md-8">
                      <span className="text-success fs-4 fw-bold">
                        <i className="bi bi-currency-dollar me-2"></i>Incentivos
                        fiscais
                      </span>
                      <br />
                      <small>Suas doações podem gerar benefícios fiscais</small>

                      <Link
                        to="/IncentivoFiscal"
                        className="btn btn-success rounded-5 ms-5"
                      >
                        <i className="bi bi-file-earmark-post"></i> Incentivos
                        Fiscais
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardEmpresa;
