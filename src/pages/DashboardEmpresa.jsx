import React, { useEffect, useState } from "react";
import LogedHeader from "../components/LogedHeader";
import { Link, useNavigate } from "react-router";

const DashboardEmpresa = () => {
  const [empresaLogada, setEmpresaLogada] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se há uma empresa logada
    const empresa = JSON.parse(localStorage.getItem("empresaLogada"));

    if (empresa) {
      setEmpresaLogada(empresa);
    } else {
      // Se não há empresa logada, redireciona para login
      navigate("/EmpresaLogin");
    }
  }, [navigate]);

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
                <h3 className="mb-0">Bem-vindo(a), {empresaLogada.nome}!</h3>
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
                    <div className="col-12 col-sm-6 col-lg-3">
                      <div className="border p-3 p-md-4 rounded-3 bg-white h-100 shadow-sm">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-bold fs-6 fs-md-5">
                            ONGs disponíveis
                          </span>
                          <i className="bi bi-suit-heart text-secondary fs-4"></i>
                        </div>
                        <p className="fs-2 fs-md-1 fw-bold mb-1">2</p>
                        <small>Organizações cadastradas</small>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">
                      <div className="border p-3 p-md-4 rounded-3 bg-white h-100 shadow-sm">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-bold fs-6 fs-md-5">
                            ONGs críticas
                          </span>
                          <i className="bi bi-exclamation-triangle text-warning fs-4"></i>
                        </div>
                        <p className="fs-2 fs-md-1 fw-bold text-danger mb-1">
                          1
                        </p>
                        <small>Precisam de ajuda urgente</small>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">
                      <div className="border p-3 p-md-4 rounded-3 bg-white h-100 shadow-sm">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-bold fs-6 fs-md-5">
                            Suas doações
                          </span>
                          <i className="bi bi-gift text-success fs-4"></i>
                        </div>
                        <p className="fs-2 fs-md-1 fw-bold text-success mb-1">
                          0
                        </p>
                        <small>Doações realizadas</small>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">
                      <div className="border p-3 p-md-4 rounded-3 bg-white h-100 shadow-sm">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-bold fs-6 fs-md-5">
                            Impacto social
                          </span>
                          <i className="bi bi-people text-primary fs-4"></i>
                        </div>
                        <p className="fs-2 fs-md-1 fw-bold text-primary mb-1">
                          32
                        </p>
                        <small>pessoas assistidas no total</small>
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
                      <button className="btn btn-primary px-4 py-2">
                        <i className="bi bi-gift me-2"></i>
                        <span className="d-none d-sm-inline">
                          Ver oportunidades
                        </span>
                        <span className="d-sm-none">Ver mais</span>
                      </button>
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
                      <div>
                        <span className="fw-bolder fs-3">
                          Instituto Ajudar{" "}
                        </span>
                        <small>🔴</small>
                        <small className="fw-medium bg-danger text-white p-1 px-2 rounded-pill ms-2">
                          Crítico
                        </small>
                      </div>

                      <button
                        type="button"
                        class="btn btn-success w-sm-auto mt-2"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Fazer doação
                      </button>

                      <div
                        class="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1
                                class="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Doar
                              </h1>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <select
                                name="doacao"
                                className="w-100 p-2 rounded-3 border-0 bg-secondary-subtle"
                              >
                                <option value="">
                                  Selecione o tipo de doação
                                </option>
                                <option value="agua">Água</option>
                                <option value="medicamento">
                                  Medicamentos
                                </option>
                                <option value="comida">Comida</option>
                              </select>
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Fechar
                              </button>
                              <button
                                type="button"
                                class="btn btn-success"
                                data-bs-dismiss="modal"
                              >
                                Confirmar doação
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-geo-alt me-1"></i>
                        <small>Centro, São Paulo - 16km</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-people me-1"></i>
                        <small>13 pessoas atendidas</small>
                      </div>
                    </div>

                    <div className="row g-2 g-md-3">
                      <div className="col-12 col-sm-6 col-lg-4">
                        <div className="bg-transparent border border-primary p-3 rounded-3 text-center">
                          <small className="d-block">Água/dia</small>
                          <span className="fw-bolder fs-5">
                            <i className="bi bi-droplet me-1"></i>
                            26L
                          </span>
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-4">
                        <div className="bg-transparent border border-success p-3 rounded-3 text-center">
                          <small className="d-block">Refeições/dia</small>
                          <span className="fw-bolder fs-5">
                            <i className="bi bi-fork-knife me-1"></i>
                            39
                          </span>
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-4">
                        <div className="bg-transparent border border-danger p-3 rounded-3 text-center">
                          <small className="d-block">Medicamentos/semana</small>
                          <span className="fw-bolder fs-5">
                            <i className="bi bi-prescription2 me-1"></i>
                            26
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mt-4 border border-1 p-4 rounded-3">
                    <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between mb-2">
                      <div>
                        <span className="fw-bolder fs-3">
                          Instituto São José{" "}
                        </span>
                        <small>🟡</small>
                        <small className="fw-medium bg-warning text-dark p-1 px-2 rounded-pill ms-2">
                          Atenção
                        </small>
                      </div>

                      <button
                        type="button"
                        class="btn btn-success w-sm-auto mt-2"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Fazer doação
                      </button>

                      <div
                        class="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1
                                class="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Doar
                              </h1>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <select
                                name="doacao"
                                className="w-100 p-2 rounded-3 border-0 bg-secondary-subtle"
                              >
                                <option value="">
                                  Selecione o tipo de doação
                                </option>
                                <option value="agua">Água</option>
                                <option value="medicamento">
                                  Medicamentos
                                </option>
                                <option value="comida">Comida</option>
                              </select>
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Fechar
                              </button>
                              <button
                                type="button"
                                class="btn btn-success"
                                data-bs-dismiss="modal"
                              >
                                Confirmar doação
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-geo-alt me-1"></i>
                        <small>Centro, São Paulo - 16km</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-people me-1"></i>
                        <small>13 pessoas atendidas</small>
                      </div>
                    </div>

                    <div className="row g-2 g-md-3">
                      <div className="col-12 col-sm-6 col-lg-4">
                        <div className="bg-transparent border border-primary p-3 rounded-3 text-center">
                          <small className="d-block">Água/dia</small>
                          <span className="fw-bolder fs-5">
                            <i className="bi bi-droplet me-1"></i>
                            26L
                          </span>
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-4">
                        <div className="bg-transparent border border-success p-3 rounded-3 text-center">
                          <small className="d-block">Refeições/dia</small>
                          <span className="fw-bolder fs-5">
                            <i className="bi bi-fork-knife me-1"></i>
                            39
                          </span>
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-4">
                        <div className="bg-transparent border border-danger p-3 rounded-3 text-center">
                          <small className="d-block">Medicamentos/semana</small>
                          <span className="fw-bolder fs-5">
                            <i className="bi bi-prescription2 me-1"></i>
                            26
                          </span>
                        </div>
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

                <div className="bg-white mt-4 p-3 p-md-4 rounded-3 border">
                  <div className="row align-items-center">
                    <div className="col-12 col-md-8">
                      <span className="text-success fs-4 fw-bold">
                        <i className="bi bi-currency-dollar me-2"></i>Incentivos
                        fiscais
                      </span>
                      <br />
                      <small>
                        Suas doações podem gerar benefícios fiscais através da
                        Lei Federal 14.258/2021
                      </small>

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
