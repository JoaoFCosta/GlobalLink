import React, { useEffect, useState } from "react";
import LogedHeader from "../components/LogedHeader";
import { useNavigate } from "react-router";

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
                <span>
                  <i className="bi bi-suit-heart fs-3"></i>
                </span>
                <span className="ms-2 fs-4 fw-medium">ONGs que precisam de ajuda</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardEmpresa;
