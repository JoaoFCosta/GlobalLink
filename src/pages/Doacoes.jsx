import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router";
import { useTheme } from "../contexts/ThemeContext";

const Doacoes = () => {
  const [empresaLogada, setEmpresaLogada] = useState(null);
  const [totalOngs, setTotalOngs] = useState(0);
  const [doacoes, setDoacoes] = useState([]);
  const [totalDoacoes, setTotalDoacoes] = useState(0);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const { darkMode } = useTheme();

  // 🔹 Novo estado: dados da nova doação
  const [novaDoacao, setNovaDoacao] = useState({
    empresaId: 0,
    ongId: 0,
    tipo: "",
    observacoes: "",
    status: "Pendente",
    empresaNome: "",
    ongNome: "",
  });

  // 🔹 Carregar empresa logada
  useEffect(() => {
    const dados = localStorage.getItem("empresaLogada");
    if (dados) {
      const empresa = JSON.parse(dados);
      setEmpresaLogada(empresa);
      setNovaDoacao((prev) => ({
        ...prev,
        empresaId: empresa.id,
        empresaNome: empresa.nome,
      }));
    }
  }, []);

  // 🔹 Buscar ONGs e doações
  useEffect(() => {
    fetch("http://localhost:5102/api/Ongs")
      .then((res) => res.json())
      .then((data) => setTotalOngs(Array.isArray(data) ? data.length : 0))
      .catch((err) => console.error("Erro ao buscar ONGs:", err));
  }, []);

  useEffect(() => {
    carregarDoacoes();
  }, []);

  const carregarDoacoes = () => {
    setLoading(true);
    fetch("http://localhost:5102/api/Donates")
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar doações");
        return response.json();
      })
      .then((data) => {
        setDoacoes(data);
        setTotalDoacoes(data.length || 0);
      })
      .catch((err) => {
        console.error("Erro ao buscar doações:", err);
        setTotalDoacoes(0);
      })
      .finally(() => setLoading(false));
  };

  // 🔹 POST - Cadastrar nova doação
  const cadastrarDoacao = async () => {
    if (!novaDoacao.tipo.trim() || !novaDoacao.ongId) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5102/api/Donates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(novaDoacao),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar doação");

      const data = await response.json();
      setDoacoes((prev) => [...prev, data]);
      setTotalDoacoes((prev) => prev + 1);
      setNovaDoacao({
        ...novaDoacao,
        tipo: "",
        observacoes: "",
        ongId: 0,
        ongNome: "",
      });
      alert("Doação cadastrada com sucesso!");
    } catch (err) {
      console.error("Erro no envio da doação:", err);
      alert("Falha ao cadastrar doação.");
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (!empresaLogada) return <div>Carregando...</div>;

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

        {/* Cards de resumo */}
        <div className="justify-content-center text-center mt-5">
          <div className="d-flex flex-column flex-lg-row justify-content-center gap-3 gap-lg-5">
            <div className="col-12">
              <div className="container-fluid">
                <div className="row g-3">
                  {/* ONGs */}
                  <div className="col-12 col-sm-6 col-lg-6">
                    <div className="border p-4 rounded-3 bg-white h-100 shadow-sm">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold">ONGs disponíveis</span>
                        <i className="bi bi-suit-heart text-secondary fs-4"></i>
                      </div>
                      <p className="fs-2 fw-bold mb-1">{totalOngs}</p>
                      <small>Organizações cadastradas</small>
                    </div>
                  </div>

                  {/* Doações */}
                  <div
                    className="col-12 col-sm-6 col-lg-6"
                    style={{ cursor: "pointer" }}
                    onClick={handleShowModal}
                  >
                    <div className="border p-4 rounded-3 bg-white h-100 shadow-sm">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold">Suas doações</span>
                        <i className="bi bi-gift text-success fs-4"></i>
                      </div>
                      <p className="fs-2 fw-bold text-success mb-1">
                        {totalDoacoes}
                      </p>
                      <small>Doações realizadas</small>
                      <br />
                      <small>(Clique para ver detalhes)</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MODAL DE DOAÇÕES */}
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
                  className={`modal-content shadow-lg border rounded-4 ${
                    darkMode
                      ? "bg-dark text-light border-secondary"
                      : "bg-white text-dark border-light"
                  }`}
                >
                  <div className="modal-header border-0">
                    <h5 className="modal-title text-success fw-bold">
                      Suas Doações Realizadas
                    </h5>
                    <button
                      type="button"
                      className={
                        darkMode ? "btn-close btn-close-white" : "btn-close"
                      }
                      onClick={handleCloseModal}
                    ></button>
                  </div>

                  <div className="modal-body">
                    {loading ? (
                      <p className="text-center text-muted">Carregando...</p>
                    ) : doacoes.length === 0 ? (
                      <p className="text-center text-muted">
                        Nenhuma doação encontrada.
                      </p>
                    ) : (
                      <div className="list-group">
                        {doacoes.map((doacao) => (
                          <div
                            key={doacao.id}
                            className={`list-group-item flex-column align-items-start mb-2 rounded-3 border ${
                              darkMode
                                ? "bg-secondary bg-opacity-10 text-light"
                                : "bg-light text-dark"
                            }`}
                          >
                            <div className="d-flex w-100 justify-content-between">
                              <h6 className="mb-1 fw-bold text-success">
                                {doacao.tipo}
                              </h6>
                              <small className="text-muted">
                                Status: {doacao.status}
                              </small>
                            </div>
                            <p className="mb-1">
                              <strong>ONG:</strong> {doacao.ongNome}
                            </p>
                            <p className="mb-1">
                              <strong>OBS:</strong> {doacao.observacoes}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="modal-footer border-0">
                    <button
                      className={`btn ${
                        darkMode ? "btn-outline-light" : "btn-outline-secondary"
                      }`}
                      onClick={handleCloseModal}
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FORMULÁRIO DE NOVA DOAÇÃO */}
        <div className="mt-5">
          <h2>Fazer nova doação</h2>
          <div className="p-4 border rounded-3 shadow-sm bg-white">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Tipo de doação</label>
                <input
                  type="text"
                  className="form-control"
                  value={novaDoacao.tipo}
                  onChange={(e) =>
                    setNovaDoacao({ ...novaDoacao, tipo: e.target.value })
                  }
                  placeholder="Ex: Alimentos, roupas..."
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">ID da ONG</label>
                <input
                  type="number"
                  className="form-control"
                  value={novaDoacao.ongId}
                  onChange={(e) =>
                    setNovaDoacao({
                      ...novaDoacao,
                      ongId: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Ex: 1"
                />
              </div>
              <div className="col-12">
                <label className="form-label">Observações</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={novaDoacao.observacoes}
                  onChange={(e) =>
                    setNovaDoacao({
                      ...novaDoacao,
                      observacoes: e.target.value,
                    })
                  }
                  placeholder="Detalhes da doação..."
                />
              </div>
              <div className="col-12">
                <button
                  className="btn btn-success w-100"
                  onClick={cadastrarDoacao}
                >
                  Enviar doação
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doacoes;
