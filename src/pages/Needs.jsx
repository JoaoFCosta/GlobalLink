import React, { useState, useEffect } from "react";
import LogedHeader from "../components/LogedHeader";
import { Link, useNavigate } from "react-router";
import { useTheme } from "../contexts/ThemeContext";

const Needs = () => {
  const [necessidades, setNecessidades] = useState([]);
  const [totalNecessidades, setTotalNecessidades] = useState(0);
  const [novaNecessidade, setNovaNecessidade] = useState({
    necessidadeTitulo: "",
    necessidadeDescricao: "",
    urgencia: "Baixa",
    categoria: "",
    local: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const { darkMode } = useTheme();

  // Carregar necessidades da ONG logada
  useEffect(() => {
    const fetchNeeds = async () => {
      const ongData = JSON.parse(localStorage.getItem("ongData"));
      if (!ongData || !ongData.email) return;

      try {
        const response = await fetch(
          `http://localhost:5102/api/Needs/ByOng/${ongData.email}`
        );
        if (!response.ok) throw new Error("Erro ao buscar necessidades");

        const data = await response.json();
        setNecessidades(data);
        setTotalNecessidades(data.length); // atualiza total
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNeeds();
  }, []);

  const handleChange = (e) => {
    setNovaNecessidade({ ...novaNecessidade, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setFeedback(null);

    const ongData = JSON.parse(localStorage.getItem("ongData"));
    if (!ongData || !ongData.id) {
      setFeedback({ type: "danger", message: "Nenhuma ONG logada." });
      setEnviando(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5102/api/Needs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...novaNecessidade, OngId: ongData.id }),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar necessidade");

      const createdNeed = await response.json();

      // Atualiza lista e total imediatamente
      setNecessidades((prev) => [...prev, createdNeed]);
      setTotalNecessidades((prev) => prev + 1);

      setFeedback({ type: "success", message: "Necessidade adicionada!" });
      setShowModal(false);
      setNovaNecessidade({
        necessidadeTitulo: "",
        necessidadeDescricao: "",
        urgencia: "Baixa",
        categoria: "",
        local: "",
      });
    } catch (err) {
      setFeedback({ type: "danger", message: err.message });
    } finally {
      setEnviando(false);
    }
  };

  if (loading) return <p>Carregando necessidades...</p>;

  return (
    <>
      <LogedHeader />
      <Link to="/DashboardOng" className="m-3 text-decoration-none">
        <i className="bi bi-arrow-left-short"></i> Voltar
      </Link>

      <div className="container">
        <h2 className="mb-0">Gestão de Necessidades</h2>
        <span>Gerencie as necessidades específicas da sua organização</span>

        <div className="d-flex justify-content-between align-items-center border border-1 p-3 rounded-3 shadow-sm bg-white mt-3">
          <span>
            Total de necessidades:{" "}
            <strong>{loading ? "..." : totalNecessidades}</strong>
          </span>
          <button
            className="btn btn-primary fw-bolder"
            onClick={() => setShowModal(true)}
          >
            + Adicionar nova necessidade
          </button>
        </div>

        <div className="mt-3">
          {loading ? (
            <p>Carregando...</p>
          ) : necessidades.length === 0 ? (
            <p>Nenhuma necessidade cadastrada.</p>
          ) : (
            <div className="list-group">
              {necessidades.map((n) => (
                <div
                  key={n.necessidadeId}
                  className="list-group-item border bg-white rounded-3 mb-2 shadow-sm"
                >
                  <h6 className="fw-bold text-primary">
                    {n.necessidadeTitulo}
                  </h6>
                  <p className="mb-1">{n.necessidadeDescricao}</p>
                  <small>
                    <strong>Urgência:</strong> {n.urgencia} |{" "}
                    <strong>Categoria:</strong> {n.categoria} |{" "}
                    <strong>Local:</strong> {n.local}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>

        {feedback && (
          <div
            className={`alert mt-3 alert-${
              feedback.type === "success" ? "success" : "danger"
            }`}
          >
            {feedback.message}
          </div>
        )}
      </div>

      {/* MODAL CADASTRO */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{
            backgroundColor: darkMode ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.35)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className={`modal-content ${
                darkMode
                  ? "bg-dark text-light border-secondary"
                  : "bg-white text-dark border-light"
              }`}
            >
              <div
                className={`modal-header ${
                  darkMode ? "border-secondary" : "border-light"
                }`}
              >
                <h5 className="modal-title">Adicionar Necessidade</h5>
                <button
                  type="button"
                  className={`btn-close ${darkMode ? "btn-close-white" : ""}`}
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input
                      type="text"
                      name="necessidadeTitulo"
                      className={`form-control ${
                        darkMode ? "bg-secondary text-light" : ""
                      }`}
                      value={novaNecessidade.necessidadeTitulo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Descrição</label>
                    <textarea
                      name="necessidadeDescricao"
                      className={`form-control ${
                        darkMode ? "bg-secondary text-light" : ""
                      }`}
                      value={novaNecessidade.necessidadeDescricao}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Urgência</label>
                    <select
                      name="urgencia"
                      className={`form-select ${
                        darkMode ? "bg-secondary text-light" : ""
                      }`}
                      value={novaNecessidade.urgencia}
                      onChange={handleChange}
                    >
                      <option value="Baixa">Baixa</option>
                      <option value="Média">Média</option>
                      <option value="Alta">Alta</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Categoria</label>
                    <input
                      type="text"
                      name="categoria"
                      className={`form-control ${
                        darkMode ? "bg-secondary text-light" : ""
                      }`}
                      value={novaNecessidade.categoria}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Local</label>
                    <input
                      type="text"
                      name="local"
                      className={`form-control ${
                        darkMode ? "bg-secondary text-light" : ""
                      }`}
                      value={novaNecessidade.local}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div
                  className={`modal-footer ${
                    darkMode ? "border-secondary" : "border-light"
                  }`}
                >
                  <button
                    type="button"
                    className={`btn ${
                      darkMode ? "btn-outline-light" : "btn-secondary"
                    }`}
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={`btn ${
                      darkMode ? "btn-success" : "btn-primary"
                    }`}
                    disabled={enviando}
                  >
                    {enviando ? "Salvando..." : "Salvar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Needs;
