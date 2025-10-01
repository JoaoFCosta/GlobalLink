import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router";

const Doacoes = () => {
  const [necessidades, setNecessidades] = useState([]);
  const [filtros, setFiltros] = useState({
    categoria: "",
    urgencia: "",
  });

  useEffect(() => {
    // Carregar necessidades do localStorage
    const necessidadesSalvas = localStorage.getItem("necessidades");
    if (necessidadesSalvas) {
      setNecessidades(JSON.parse(necessidadesSalvas));
    }
  }, []);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const necessidadesFiltradas = necessidades.filter((necessidade) => {
    const filtroCategoria =
      !filtros.categoria || necessidade.categoria === filtros.categoria;
    const filtroUrgencia =
      !filtros.urgencia || necessidade.urgencia === filtros.urgencia;
    return filtroCategoria && filtroUrgencia;
  });
  return (
    <>
      <div className="d-flex justify-content-between">
        <Link to="/DashboardEmpresa" className="m-3 text-decoration-none">
          <i className="bi bi-arrow-left-short"></i> Voltar
        </Link>
        <Header />
      </div>
      <div className="container">
        <h1>Oportunidades de doação</h1>
        <span>Encontre ONGs que precisam de ajuda e faça a diferença</span>
        <div className="justify-content-center text-center mt-5">
          <div className="d-flex flex-column flex-lg-row justify-content-center gap-3 gap-lg-5">
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
                      <p className="fs-2 fs-md-1 fw-bold text-danger mb-1">1</p>
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
          </div>

          <div className="mt-4">
            <h5>Filtros</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="categoria" className="form-label">
                  Categoria
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  className="form-select"
                  value={filtros.categoria}
                  onChange={handleFiltroChange}
                >
                  <option value="">Todas</option>
                  <option value="Alimentação">Alimentação</option>
                  <option value="Medicamentos">Medicamentos</option>
                  <option value="Roupas">Roupas</option>
                  <option value="Educação">Educação</option>
                  <option value="Voluntários">Voluntários</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="urgencia" className="form-label">
                  Urgência
                </label>
                <select
                  id="urgencia"
                  name="urgencia"
                  className="form-select"
                  value={filtros.urgencia}
                  onChange={handleFiltroChange}
                >
                  <option value="">Todas</option>
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Necessidades */}
        <div className="mt-5">
          {necessidadesFiltradas.length === 0 ? (
            <p>Nenhuma necessidade encontrada com os filtros aplicados.</p>
          ) : (
            <div className="row g-4">
              {necessidadesFiltradas.map((necessidade) => (
                <div key={necessidade.id} className="col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-header">
                      <span className={`badge bg-${necessidade.urgencia}`}>
                        {necessidade.urgencia.charAt(0).toUpperCase() +
                          necessidade.urgencia.slice(1)}
                      </span>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{necessidade.titulo}</h5>
                      <p className="card-text">{necessidade.descricao}</p>
                      <p className="text-muted">
                        <strong>Categoria:</strong> {necessidade.categoria}
                      </p>
                    </div>
                    <div className="card-footer text-muted">
                      Criado em: {necessidade.dataCriacao}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Doacoes;
