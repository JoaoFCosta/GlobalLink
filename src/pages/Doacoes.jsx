import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router";
import { useTheme } from "../contexts/ThemeContext";

const Doacoes = () => {
  const [necessidades, setNecessidades] = useState([]);
  const [doacoes, setDoacoes] = useState([]);
  const [totalOngs, setTotalOngs] = useState(0);
  const [totalDoacoes, setTotalDoacoes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [showModalDoacoes, setShowModalDoacoes] = useState(false);
  const [showModalOngs, setShowModalOngs] = useState(false);
  const [doacaoEditando, setDoacaoEditando] = useState(null);
  const [editando, setEditando] = useState(null);
  const [dadosEdicao, setDadosEdicao] = useState({
    tipo: "",
    observacoes: "",
    status: "",
  });

  const { darkMode } = useTheme();

  const dadosIniciais = {
    ongId: 0,
    empresaId: 0,
    tipo: "",
    observacoes: "",
    status: "Pendente",
    ongNome: "",
  };

  const [novaDoacao, setNovaDoacao] = useState(dadosIniciais);

  // === BUSCAR ONGs ===
  const carregarOngs = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5102/api/Ongs");
      if (!response.ok)
        throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);

      const data = await response.json();
      setNecessidades(data);
      setTotalOngs(Array.isArray(data) ? data.length : 0);
      console.log("✅ ONGs carregadas:", data);
    } catch (err) {
      console.error("❌ Erro ao buscar ONGs:", err);
      setTotalOngs(0);
      setNecessidades([]);
    } finally {
      setLoading(false);
    }
  };

  // === BUSCAR DOAÇÕES ===
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

  // === EFFECTS ===
  useEffect(() => {
    carregarOngs();
    carregarDoacoes();
  }, []);

  // PUT - Atualizar doação (função não utilizada na UI atual)
  const atualizarDoacao = async (id, dadosAtualizados) => {
    setEnviando(true);
    setFeedback(null);

    try {
      const response = await fetch(`http://localhost:5102/api/Donates/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          ongId: dadosAtualizados.ongId,
          empresaId: dadosAtualizados.empresaId,
          tipo: dadosAtualizados.tipo,
          observacoes: dadosAtualizados.observacoes,
          status: dadosAtualizados.status,
        }),
      });

      if (!response.ok) {
        const erroData = await response.json().catch(() => ({}));
        throw new Error(
          erroData.title || erroData.message || "Erro ao atualizar."
        );
      }

      setFeedback({
        type: "success",
        message: `Doação ID ${id} atualizada com sucesso!`,
      });
      carregarDoacoes(); // Atualiza a lista
    } catch (error) {
      setFeedback({ type: "danger", message: error.message });
    } finally {
      setEnviando(false);
    }
  };
  
  // Abre o modo de edição
  const iniciarEdicao = (doacao) => {
    setEditando(doacao.id);
    setDadosEdicao({
      tipo: doacao.tipo,
      observacoes: doacao.observacoes,
      status: doacao.status,
    });
  };

  // Cancela o modo de edição
  const cancelarEdicao = () => {
    setEditando(null);
    setDadosEdicao({ tipo: "", observacoes: "", status: "" });
  };

  // Atualiza os campos do formulário de edição
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setDadosEdicao((prev) => ({ ...prev, [name]: value }));
  };

  // Envia a atualização
  const salvarEdicao = async (id) => {
    await atualizarDoacao(id, {
      ...doacoes.find((d) => d.id === id),
      ...dadosEdicao,
    });
    cancelarEdicao();
  };

  // === FORM ===
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaDoacao((prevState) => ({
      ...prevState,
      [name]: name === "ongId" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:5102/api/Donates";
    setEnviando(true);
    setFeedback(null);

    const payload = {
      ongId: novaDoacao.ongId,
      empresaId: novaDoacao.empresaId,
      tipo: novaDoacao.tipo,
      observacoes: novaDoacao.observacoes,
      status: novaDoacao.status,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const dadosResposta = await response.json();
        console.log("✅ Doação criada:", dadosResposta);

        setFeedback({
          type: "success",
          message: `Doação cadastrada com sucesso! ID: ${dadosResposta.id}`,
        });

        setNovaDoacao(dadosIniciais);
        carregarDoacoes(); // Atualiza lista
        return;
      }

      let mensagemErro = `Erro HTTP ${response.status}: ${response.statusText}`;
      try {
        const erroData = await response.json();
        if (erroData) {
          mensagemErro =
            erroData.title ||
            erroData.message ||
            erroData.error ||
            JSON.stringify(erroData);
        }
      } catch {
        console.warn("⚠️ Resposta de erro não era JSON.");
      }
      throw new Error(mensagemErro);
    } catch (error) {
      console.error("❌ Erro ao enviar a doação:", error);
      setFeedback({
        type: "danger",
        message: `Falha no envio: ${error.message}. Verifique sua conexão ou os dados.`,
      });
    } finally {
      setEnviando(false);
    }
  };

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

        {/* === CARDS DE RESUMO === */}
        <div className="justify-content-center text-center mt-5">
          <div className="d-flex flex-column flex-lg-row justify-content-center gap-3 gap-lg-5">
            <div className="col-12">
              <div className="container-fluid">
                <div className="row g-3">
                  {/* === ONGs === */}
                  <div
                    className="col-12 col-sm-6 col-lg-6"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowModalOngs(true)}
                  >
                    <div className="border p-4 rounded-3 bg-white h-100 shadow-sm">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold">ONGs disponíveis</span>
                        <i className="bi bi-suit-heart text-secondary fs-4"></i>
                      </div>
                      <p className="fs-2 fw-bold mb-1">{totalOngs}</p>
                      <small>Organizações cadastradas</small>
                      <br />
                      <small>(Clique para ver detalhes)</small>
                    </div>
                  </div>

                  {/* === DOAÇÕES === */}
                  <div
                    className="col-12 col-sm-6 col-lg-6"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowModalDoacoes(true)}
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

          {/* === MODAL ONGS === */}
          {showModalOngs && (
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
                    <h5 className="modal-title text-secondary fw-bold">
                      ONGs Cadastradas
                    </h5>
                    <button
                      type="button"
                      className={
                        darkMode ? "btn-close btn-close-white" : "btn-close"
                      }
                      onClick={() => setShowModalOngs(false)}
                    ></button>
                  </div>

                  <div className="modal-body">
                    {loading ? (
                      <p className="text-center text-muted">Carregando...</p>
                    ) : necessidades.length === 0 ? (
                      <p className="text-center text-muted">
                        Nenhuma ONG encontrada.
                      </p>
                    ) : (
                      <div className="list-group text-start">
                        {necessidades.map((ong) => (
                          <div
                            key={ong.id}
                            className={`list-group-item mb-2 rounded-3 border ${
                              darkMode
                                ? "bg-secondary bg-opacity-10 text-light"
                                : "bg-light text-dark"
                            }`}
                          >
                            <h6 className="fw-bold text-secondary mb-1">
                              {ong.ongNome}
                            </h6>
                            <h6 className="mb-1">
                              <strong>Código da ONG:</strong> {ong.ongId}
                            </h6>
                            <p className="mb-1">
                              <strong>Local: </strong>
                              {ong.ongBairro}, {ong.ongRua}, {ong.ongNumero}
                            </p>
                            <p className="mb-1">
                              <strong>Contato:</strong> {ong.ongTelefone}
                            </p>
                            <p className="mb-1">
                              <strong>Caixa postal:</strong> {ong.ongCep}
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
                      onClick={() => setShowModalOngs(false)}
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* === MODAL DOAÇÕES === */}
          {showModalDoacoes && (
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
                      onClick={() => setShowModalDoacoes(false)}
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
                      <div className="list-group text-start">
                        {doacoes.map((doacao) => (
                          <div
                            key={doacao.id}
                            className={`list-group-item flex-column align-items-start mb-2 rounded-3 border ${
                              darkMode
                                ? "bg-secondary bg-opacity-10 text-light"
                                : "bg-light text-dark"
                            }`}
                          >
                            {/* Se está editando essa doação */}
                            {editando === doacao.id ? (
                              <>
                                <h6 className="fw-bold text-primary mb-2">
                                  Editar Doação #{doacao.id}
                                </h6>

                                <div className="mb-2">
                                  <label className="form-label">Tipo</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="tipo"
                                    value={dadosEdicao.tipo}
                                    onChange={handleEditChange}
                                  />
                                </div>

                                <div className="mb-2">
                                  <label className="form-label">
                                    Observações
                                  </label>
                                  <textarea
                                    className="form-control"
                                    name="observacoes"
                                    value={dadosEdicao.observacoes}
                                    onChange={handleEditChange}
                                    rows="2"
                                  />
                                </div>

                                <div className="mb-2">
                                  <label className="form-label">Status</label>
                                  <select
                                    className="form-select"
                                    name="status"
                                    value={dadosEdicao.status}
                                    onChange={handleEditChange}
                                  >
                                    <option value="Pendente">Pendente</option>
                                    <option value="Em Andamento">
                                      Em Andamento
                                    </option>
                                    <option value="Concluído">Concluído</option>
                                  </select>
                                </div>

                                <div className="d-flex justify-content-end gap-2">
                                  <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => salvarEdicao(doacao.id)}
                                  >
                                    Salvar
                                  </button>
                                  <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={cancelarEdicao}
                                  >
                                    Cancelar
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="d-flex w-100 justify-content-between">
                                  <h6 className="mb-1 fw-bold text-success">
                                    {doacao.tipo}
                                  </h6>
                                  <div>
                                    <small className="text-muted me-3">
                                      Status: {doacao.status}
                                    </small>
                                    <button
                                      className="btn btn-outline-primary btn-sm"
                                      onClick={() => iniciarEdicao(doacao)}
                                    >
                                      <i className="bi bi-pencil"></i>
                                    </button>
                                  </div>
                                </div>
                                <p className="mb-1">
                                  <strong>ONG:</strong> {doacao.ongNome}
                                </p>
                                <p className="mb-1">
                                  <strong>OBS:</strong> {doacao.observacoes}
                                </p>
                              </>
                            )}
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
                      onClick={() => setShowModalDoacoes(false)}
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* === FORMULÁRIO DE NOVA DOAÇÃO === */}
        <form
          onSubmit={handleSubmit}
          className="container mt-5 mb-5 d-flex row"
        >
          {/* Campos do formulário */}
          <div className="col-6 col-md-6 mb-3">
            <label htmlFor="ongIdInput" className="form-label">
              Código da ONG
            </label>
            <input
              type="number"
              className="form-control shadow-sm"
              id="ongIdInput"
              name="ongId"
              value={novaDoacao.ongId}
              onChange={handleInputChange}
              required
              min="1"
            />
          </div>

          <div className="col-6 col-md-6 mb-3">
            <label htmlFor="empresaIdInput" className="form-label">
              Código da Empresa
            </label>
            <input
              type="number"
              className="form-control shadow-sm"
              id="empresaIdInput"
              name="empresaId"
              value={novaDoacao.empresaId}
              onChange={handleInputChange}
              required
              min="1"
            />
          </div>

          <div className="col-6 col-md-6 mb-3">
            <label htmlFor="tipoInput" className="form-label">
              Tipo da Doação
            </label>
            <input
              type="text"
              className="form-control shadow-sm"
              id="tipoInput"
              name="tipo"
              value={novaDoacao.tipo}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-6 col-md-6 mb-3">
            <label htmlFor="statusSelect" className="form-label">
              Status
            </label>
            <select
              className="form-select shadow-sm"
              id="statusSelect"
              name="status"
              value={novaDoacao.status}
              onChange={handleInputChange}
            >
              <option value="Pendente">Pendente</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluído">Concluído</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="observacoesInput" className="form-label">
              Observações
            </label>
            <textarea
              className="form-control shadow-sm"
              id="observacoesInput"
              name="observacoes"
              value={novaDoacao.observacoes}
              onChange={handleInputChange}
              rows="3"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={enviando}>
            {enviando ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Enviando...
              </>
            ) : (
              "Cadastrar Doação"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Doacoes;
