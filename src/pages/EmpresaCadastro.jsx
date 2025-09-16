import React from "react";
import Header from "../components/Header";
import { Link } from "react-router";

const EmpresaCadastro = () => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <Link to="/" className="m-3 text-decoration-none">
          <i className="bi bi-arrow-left-short"></i> Voltar
        </Link>
        <Header />
      </div>

      <div className="container-fluid">
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
                  <span className="fw-medium">Nome da Empresa *</span>
                  <input
                    type="text"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="Ex: SuperMercado BomPreço"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <span className="fw-medium">CNPJ *</span>
                  <input
                    type="text"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="00.000.000/0000-00"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <span className="fw-medium">E-mail *</span>
                  <input
                    type="email"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="Ex: contato@bompreco.com"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <span className="fw-medium">Telefone *</span>
                  <input
                    type="tel"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <span className="fw-medium">Senha *</span>
                  <input
                    type="password"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <span className="fw-medium">Confirmar Senha *</span>
                  <input
                    type="password"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                  />
                </div>

                <div className="col-12">
                  <span className="fw-medium">Ramo de Atuação</span>
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
                  <span className="fw-medium">Rua *</span>
                  <input
                    type="text"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="Ex: Rua do Comércio"
                  />
                </div>

                <div className="col-12 col-md-3">
                  <span className="fw-medium">Número *</span>
                  <input
                    type="text"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="000"
                  />
                </div>

                <div className="col-12 col-md-4">
                  <span className="fw-medium">Complemento</span>
                  <input
                    type="text"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="Sala 101"
                  />
                </div>

                <div className="col-12 col-md-4">
                  <span className="fw-medium">Bairro *</span>
                  <input
                    type="text"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="Vila Nova"
                  />
                </div>

                <div className="col-12 col-md-4">
                  <span className="fw-medium">CEP *</span>
                  <input
                    type="text"
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
                  <button className="btn w-100 btn-success px-5 py-2 rounded-3 fw-medium">
                    Cadastrar Empresa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpresaCadastro;
