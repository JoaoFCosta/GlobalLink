import React, { useEffect, useState } from "react";
import LogedHeader from "../components/LogedHeader";
import { Link, useNavigate } from "react-router";
import { useTheme } from "../contexts/ThemeContext";

const DashboardEmpresa = () => {
  const [companyToken, setCompanyToken] = useState("");
  const [companyInfo, setCompanyInfo] = useState({ nome: "", email: "" });
  const [totalOngs, setTotalOngs] = useState(0);
  const [ongs, setOngs] = useState([]);
  const [needs, setNeeds] = useState([]);
  const [totalNeeds, setTotalNeeds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedNeeds, setSelectedNeeds] = useState([]);
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  useEffect(() => {
    fetch("https://www.globallinkapi.somee.com/api/Ongs")
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar ONGs");
        return response.json();
      })
      .then((data) => {
        setTotalOngs(data.length);
        setOngs(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar as ONGs:", error);
      });
  }, []);

  useEffect(() => {
    fetch("https://www.globallinkapi.somee.com/api/Needs")
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar necessidades");
        return response.json();
      })
      .then((data) => {
        setNeeds(data);
        setTotalNeeds(data.length);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    const confirmar = window.confirm("Tem certeza que deseja sair da conta?");
    if (confirmar) {
      localStorage.removeItem("companyData");
      navigate("/");
    }
  };

  useEffect(() => {
    // Verifica se há uma empresa logada
    const empresa = localStorage.getItem("companyData"); // objeto com nome/email/token

    if (empresa) {
      try {
        const parsed = JSON.parse(empresa);
        setCompanyInfo({
          nome: parsed.nome,
          email: parsed.email,
          id: parsed.id,
        });
        setCompanyToken(parsed.token);
      } catch (err) {
        console.error("Erro ao ler dados da Empresa:", err);
        navigate("/EmpresaLogin");
      }
    } else {
      // Se não há ong logada, redireciona para login
      navigate("/EmpresaLogin");
    }
  }, [navigate]);

  const handleShowNeeds = () => {
    setSelectedNeeds(needs);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  if (!companyToken) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <LogedHeader />

      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center bg-white p-4 rounded-3 shadow-sm border-1">
              <div>
                <h3 className="mb-0">
                  Bem-vindo(a) {companyInfo.nome || companyInfo.email}!
                </h3>
                <span className="fw-bolder">ID da Empresa: {companyInfo.id}</span>
                <br />
                <span>
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

            {/* Métricas */}
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

                    <div
                      className="col-12 col-sm-6 col-lg-6"
                      style={{ cursor: "pointer" }}
                      onClick={handleShowNeeds}
                    >
                      <div className="border p-3 p-md-4 rounded-3 bg-white h-100 shadow-sm">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-bold fs-6 fs-md-5">
                            Necessidades
                          </span>
                          <i className="bi bi-gift text-success fs-4"></i>
                        </div>
                        <span className="fs-2 fs-md-1 fw-bold mb-1">
                          {totalNeeds}
                        </span>
                        <br />
                        <small>Necessidades pendentes</small>
                        <br />
                        <small>(Clique para ver as necessidades)</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ONGs */}
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

              {/* Lista de ONGs */}
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

                {/* Modal de Necessidades (Tema Dark) */}
                {showModal && (
                  <div
                    className="modal fade show d-block"
                    style={{
                      backgroundColor: darkMode
                        ? "rgba(0,0,0,0.7)"
                        : "rgba(0,0,0,0.35)",
                    }}
                    tabIndex="-1"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div
                        className={`modal-content shadow-lg ${
                          darkMode
                            ? "bg-dark text-light border-secondary"
                            : "bg-white text-dark border-light"
                        }`}
                        style={{ borderWidth: 1 }}
                      >
                        <div
                          className={`modal-header ${
                            darkMode ? "border-secondary" : "border-light"
                          }`}
                        >
                          <h5
                            className={`modal-title ${
                              darkMode ? "text-light" : "text-primary"
                            }`}
                          >
                            Necessidades das ONGs
                          </h5>
                          <button
                            type="button"
                            // Use proper close button style depending on theme
                            className={
                              darkMode
                                ? "btn-close btn-close-white"
                                : "btn-close"
                            }
                            onClick={handleCloseModal}
                          ></button>
                        </div>

                        <div className="modal-body">
                          {loading ? (
                            <p
                              className={`text-center ${
                                darkMode ? "text-muted" : "text-muted"
                              }`}
                            >
                              Carregando...
                            </p>
                          ) : selectedNeeds.length === 0 ? (
                            <p
                              className={`text-center ${
                                darkMode ? "text-muted" : "text-muted"
                              }`}
                            >
                              Nenhuma necessidade cadastrada.
                            </p>
                          ) : (
                            <div className="list-group">
                              {selectedNeeds.map((need) => (
                                <div
                                  key={need.id || need.necessidadeTitulo}
                                  className={`list-group-item list-group-item-action flex-column align-items-start mb-3 rounded-3 ${
                                    darkMode
                                      ? "bg-secondary bg-opacity-10 border-secondary text-light"
                                      : "bg-secondary bg-opacity-25 border-secondary text-dark"
                                  }`}
                                >
                                  <div className="d-flex w-100 justify-content-between">
                                    <h6
                                      className={`mb-1 fw-bold ${
                                        darkMode ? "text-light" : "text-primary"
                                      }`}
                                    >
                                      {need.necessidadeTitulo || "Sem título"}
                                    </h6>
                                    <small
                                      className={`${
                                        darkMode ? "text-light" : "text-muted"
                                      }`}
                                    >
                                      ONG: {need.ongNome || "Desconhecida"}
                                    </small>
                                  </div>
                                  <p
                                    className={`${
                                      darkMode
                                        ? "mb-1 text-light"
                                        : "mb-1 text-dark"
                                    }`}
                                  >
                                    {need.necessidadeDescricao ||
                                      "Sem descrição."}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div
                          className={`modal-footer ${
                            darkMode ? "border-secondary" : "border-light"
                          }`}
                        >
                          <button
                            className={
                              darkMode
                                ? "btn btn-outline-light"
                                : "btn btn-outline-secondary"
                            }
                            onClick={handleCloseModal}
                          >
                            Fechar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* INCENTIVOS */}
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
