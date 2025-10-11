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
  const [showModal, setShowModal] = useState(false);

  const { darkMode } = useTheme();

  const dadosIniciais = {
    ongId: 0,
    empresaId: 0,
    tipo: "",
    observacoes: "",
    status: "Pendente",
    ongNome: "",
  };

  // Estado da nova doação
  const [novaDoacao, setNovaDoacao] = useState(dadosIniciais);

  // Buscar ONGs
  useEffect(() => {
    fetch("http://localhost:5102/api/Ongs")
      .then((res) => res.json())
      .then((data) => {
        setNecessidades(data);
        setTotalOngs(Array.isArray(data) ? data.length : 0);
      })
      .catch((err) => console.error("Erro ao buscar ONGs:", err));
  }, []);

  // Buscar doações
  useEffect(() => {
    carregarDoacoes();
  }, []);

  const carregarDoacoes = () => {
    setLoading(true);
    fetch("http://localhost:5102/api/Donates")
      .then((res) => res.json())
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

  // Função para atualizar o estado quando os inputs mudam
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaDoacao((prevState) => ({
      ...prevState,
      [name]: name === "ongId" ? parseInt(value) : value,
    }));
  };

  // Função que lida com o envio do formulário
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
          // "Authorization": `Bearer ${token}` // se usar JWT
        },
        body: JSON.stringify(payload),
      });

      // Se a requisição foi bem-sucedida
      if (response.ok) {
        const dadosResposta = await response.json();

        console.log("✅ Doação criada:", dadosResposta);

        setFeedback({
          type: "success",
          message: `Doação cadastrada com sucesso! ID: ${dadosResposta.id}`,
        });

        // Limpa o formulário
        setNovaDoacao(dadosIniciais);
        return;
      }

      // Se houve erro HTTP (4xx ou 5xx)
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

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
        <form
          onSubmit={handleSubmit}
          className="container mt-5 mb-5 d-flex row "
        >
          {/* Campo ONG ID */}
          <div className="col-6 col-md-6 mb-3">
            <label htmlFor="ongIdInput" className="form-label">
              Código da ONG
            </label>
            <input
              type="number"
              className="form-control" // form-control é essencial para input
              id="ongIdInput"
              name="ongId"
              value={novaDoacao.ongId}
              onChange={handleInputChange}
              required
              min="1" // Sugestão: IDs de FKs válidos geralmente são maiores que 0
            />
          </div>

          {/* Campo EMPRESA ID */}
          <div className="col-6 col-md-6 mb-3">
            <label htmlFor="empresaIdInput" className="form-label">
              Código da Empresa
            </label>
            <input
              type="number"
              className="form-control"
              id="empresaIdInput"
              name="empresaId"
              value={novaDoacao.empresaId}
              onChange={handleInputChange}
              required
              min="1"
            />
          </div>

          {/* Campo TIPO */}
          <div className="col-6 col-md-6 mb-3">
            <label htmlFor="tipoInput" className="form-label">
              Tipo da Doação
            </label>
            <input
              type="text"
              className="form-control"
              id="tipoInput"
              name="tipo"
              value={novaDoacao.tipo}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Campo STATUS (Select) */}
          <div className="col-6 col-md-6 mb-3">
            <label htmlFor="statusSelect" className="form-label">
              Status
            </label>
            <select
              className="form-select" // form-select é a classe para select
              id="statusSelect"
              name="status"
              value={novaDoacao.status}
              onChange={handleInputChange}
            >
              <option value="Pendente">Pendente</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluído">Concluído</option>
              {/* Adicione outros status conforme seu C# */}
            </select>
          </div>

          {/* Campo OBSERVAÇÕES (Textarea) */}
          <div className="mb-3">
            <label htmlFor="observacoesInput" className="form-label">
              Observações
            </label>
            <textarea
              className="form-control"
              id="observacoesInput"
              name="observacoes"
              value={novaDoacao.observacoes}
              onChange={handleInputChange}
              rows="3"
            />
          </div>

          {/* Botão de Envio */}
          <button
            type="submit"
            className="btn btn-primary" // Botão primário azul
            disabled={enviando}
          >
            {enviando ? (
              // Spinner de carregamento do Bootstrap
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
