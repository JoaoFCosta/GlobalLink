import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    urgency: "baixa",
    contact: "",
    location: "",
  });

  // Load alerts from localStorage on component mount
  useEffect(() => {
    const savedAlerts = localStorage.getItem("alerts");
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    }
  }, []);

  // Save alerts to localStorage whenever alerts change
  useEffect(() => {
    localStorage.setItem("alerts", JSON.stringify(alerts));
  }, [alerts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    const newAlert = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toLocaleDateString("pt-BR"),
    };

    setAlerts((prev) => [newAlert, ...prev]);
    setFormData({
      title: "",
      description: "",
      category: "",
      urgency: "baixa",
      contact: "",
      location: "",
    });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta necessidade?")) {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "alta":
        return "danger";
      case "media":
        return "warning";
      case "baixa":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <>
      <Link to="/DashboardOng" className="m-3 text-decoration-none">
        <i className="bi bi-arrow-left-short"></i> Voltar
      </Link>

      <div className="container-fluid mt-3">
        <div className="row">
          <h2 className="mx-5">Gestão de Necessidades e Alertas</h2>
          <div className="col-12">
            <div className="d-flex flex-column flex-md-row justify-content-between rounded-3 align-items-start align-items-md-center bg-white p-4 shadow-sm border-1">
              <div className="mb-3 mb-md-0">
                <span>
                  Gerencie as necessidades específicas da sua organização
                </span>
              </div>

              <button
                className="btn btn-primary fw-bolder"
                onClick={() => setShowModal(true)}
              >
                + Adicionar nova necessidade
              </button>
            </div>
          </div>

          {/* Alerts List */}
          <div className="col-12 mt-4 bg-white rounded-3 p-4">
            {alerts.length === 0 ? (
              <div className="text-center py-5">
                <p>Nenhuma necessidade cadastrada ainda.</p>
              </div>
            ) : (
              <div className="row">
                {alerts.map((alert) => (
                  <div key={alert.id} className="col-12 col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 shadow-sm">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <span
                          className={`badge bg-${getUrgencyColor(
                            alert.urgency
                          )}`}
                        >
                          {alert.urgency.charAt(0).toUpperCase() +
                            alert.urgency.slice(1)}
                        </span>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(alert.id)}
                        >
                          ×
                        </button>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{alert.title}</h5>
                        <p className="card-text">{alert.description}</p>
                        <p className="text-muted small">
                          <strong>Categoria:</strong> {alert.category}
                        </p>
                        {alert.location && (
                          <p className="text-muted small">
                            <strong>Local:</strong> {alert.location}
                          </p>
                        )}
                        {alert.contact && (
                          <p className="text-muted small">
                            <strong>Contato:</strong> {alert.contact}
                          </p>
                        )}
                      </div>
                      <div className="card-footer text-muted small">
                        Criado em: {alert.createdAt}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nova Necessidade</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Título *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Descrição *</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Categoria *</label>
                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione uma categoria</option>
                      <option value="Alimentação">Alimentação</option>
                      <option value="Roupas">Roupas</option>
                      <option value="Medicamentos">Medicamentos</option>
                      <option value="Educação">Educação</option>
                      <option value="Voluntários">Voluntários</option>
                      <option value="Doações">Doações</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Urgência</label>
                    <select
                      className="form-select"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                    >
                      <option value="baixa">Baixa</option>
                      <option value="media">Média</option>
                      <option value="alta">Alta</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Local</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Cidade, bairro..."
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Salvar
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

export default Alerts;
