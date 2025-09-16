import React, { useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router";

const EmpresaCadastro = () => {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const navigate = useNavigate();

  const handleCreateAcc = (e) => {
    e.preventDefault();

    // Validação simples
    if (
      !nome ||
      !cnpj ||
      !email ||
      !password ||
      !rua ||
      !numero ||
      !bairro ||
      !cep
    ) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const empresaData = {
      nome,
      cnpj,
      email,
      tel,
      password,
      endereco: {
        rua,
        numero,
        bairro,
        cep,
      },
    };

    try {
      // Pega empresas já salvas no localStorage
      const empresasSalvas = JSON.parse(localStorage.getItem("empresas")) || [];

      // Adiciona a nova
      empresasSalvas.push(empresaData);

      // Salva de volta no localStorage
      localStorage.setItem("empresas", JSON.stringify(empresasSalvas));

      alert("Cadastro realizado com sucesso!");

      // Resetar os campos
      setNome("");
      setCnpj("");
      setEmail("");
      setTel("");
      setPassword("");
      setRua("");
      setNumero("");
      setBairro("");
      setCep("");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar empresa no localStorage.");
    }

    navigate("/DashboardEmpresa");
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <Link to="/" className="m-3 text-decoration-none">
          <i className="bi bi-arrow-left-short"></i> Voltar
        </Link>
        <Header />
      </div>

      <form className="container-fluid" onSubmit={handleCreateAcc}>
        <div className="row justify-content-center text-center g-0">
          <div className="col-11 col-md-10 col-lg-8">
            <div className="border rounded-4 bg-white p-3 p-md-4 d-flex text-center justify-content-center flex-column h-100 shadow-sm">
              <h1 className="fw-normal text-success">Cadastro de Empresa</h1>
              <span className="mb-3">
                Registre sua empresa para encontrar ONGs e fazer doações
              </span>

              <div className="row align-items-center justify-content-center text-start mt-3 g-2">
                <span className="fw-medium fs-5 mb-3">
                  Dados Básicos da Empresa
                </span>

                <div className="col-12 col-md-6">
                  <label className="fw-medium" htmlFor="frmNome">
                    Nome da Empresa *
                  </label>
                  <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    type="text"
                    name="frmNome"
                    id="frmNome"
                    className="form-control w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="Ex: SuperMercado BomPreço"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="fw-medium" htmlFor="frmCNPJ">
                    CNPJ *
                  </label>
                  <input
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    type="number"
                    name="frmCNPJ"
                    id="frmCNPJ"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="00.000.000/0000-00"
                    maxLength={14}
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="fw-medium" htmlFor="frmEmail">
                    E-mail *
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="frmEmail"
                    id="frmEmail"
                    className="form-control w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="Ex: contato@bompreco.com"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="fw-medium" htmlFor="frmTel">
                    Telefone *
                  </label>
                  <input
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    type="tel"
                    name="frmTel"
                    id="frmTel"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="fw-medium" htmlFor="frmPassword">
                    Senha *
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="frmPassword"
                    id="frmPassword"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="fw-medium" htmlFor="frmPassword">
                    Confirmar Senha *
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="frmPassword"
                    id="frmPassword"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="fw-medium">Ramo de Atuação</label>
                  <select
                    name="atuacao"
                    className="w-100 p-2 rounded-3 border-0 bg-secondary-subtle"
                  >
                    <option value="">Selecione o ramo de atuação</option>
                    <option value="supermercado">Supermercado</option>
                    <option value="farmacia">Farmácia</option>
                    <option value="restaurante">Restaurante</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <span className="fw-medium fs-5 mt-4 mb-3">Endereço</span>

                <div className="col-12 col-md-9">
                  <label className="fw-medium" htmlFor="frmRua">
                    Rua *
                  </label>
                  <input
                    value={rua}
                    onChange={(e) => setRua(e.target.value)}
                    type="text"
                    name="frmRua"
                    id="frmRua"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="Ex: Rua do Comércio"
                    required
                  />
                </div>

                <div className="col-12 col-md-3">
                  <label className="fw-medium" htmlFor="frmNumero">
                    Número *
                  </label>
                  <input
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    type="text"
                    name="frmNumero"
                    id="frmNumero"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="000"
                    required
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="fw-medium">Complemento</label>
                  <input
                    type="text"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="Sala 101"
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="fw-medium" htmlFor="frmBairro">
                    Bairro *
                  </label>
                  <input
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    type="text"
                    name="frmBairro"
                    id="frmBairro"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="Vila Nova"
                    required
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="fw-medium" htmlFor="frmCep">
                    CEP *
                  </label>
                  <input
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    type="text"
                    name="frmCep"
                    id="frmCep"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="12345-678"
                  />
                </div>

                <div className="text-success bg-white mt-4">
                  <p className="fw-medium">
                    Benefícios de ser uma Empresa Doadora
                  </p>
                  <ul>
                    <li>
                      Incentivos fiscais através da Lei Federal 14.258/2021
                    </li>
                    <li>
                      Fortalecimento da responsabilidade social corporativa
                    </li>
                    <li>Visibilidade positiva da marca na comunidade</li>
                    <li>
                      Certificados de doação para comprovar as ações sociais
                    </li>
                  </ul>
                </div>

                <div className="col-12 text-center mt-4">
                  <button
                    type="submit"
                    className="btn w-100 btn-success px-5 py-2 rounded-3 fw-medium"
                  >
                    Cadastrar Empresa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EmpresaCadastro;
