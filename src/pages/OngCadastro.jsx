import React from "react";
import Header from "../components/Header";
import { Link } from "react-router";

const OngCadastro = () => {
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
              <h1 className="fw-normal text-primary">Cadastro de ONG</h1>
              <span className="mb-3">
                Registre sua organização para receber doações e monitorar
                estoques
              </span>

              <div className="row align-items-center justify-content-center text-start mt-3 g-2">
                <span className="fw-medium fs-5 mb-3">
                  Dados Básicos da ONG
                </span>

                <div className="col-12 col-md-6">
                  <span className="fw-medium">Nome da ONG *</span>
                  <input
                    type="text"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="Ex: Instituto Ajudar"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <span className="fw-medium">CNPJ *</span>
                  <input
                    type="text"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="00.000.000/0000-00"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <span className="fw-medium">E-mail *</span>
                  <input
                    type="email"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="Ex: contato@ajudar.com"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <span className="fw-medium">Telefone *</span>
                  <input
                    type="tel"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <span className="fw-medium">Senha *</span>
                  <input
                    type="password"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <span className="fw-medium">Confirmar Senha *</span>
                  <input
                    type="password"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    required
                  />
                </div>

                <span className="fw-medium fs-5 mt-4 mb-3">Endereço</span>

                <div className="col-12 col-md-9">
                  <span className="fw-medium">Rua *</span>
                  <input
                    type="text"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="Ex: Rua do Comércio"
                    required
                  />
                </div>

                <div className="col-12 col-md-3">
                  <span className="fw-medium">Número *</span>
                  <input
                    type="text"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="000"
                    required
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
                    required
                  />
                </div>

                <div className="col-12 col-md-4">
                  <span className="fw-medium">CEP *</span>
                  <input
                    type="text"
                    className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                    placeholder="12345-678"
                    required
                  />
                </div>

                <span className="fw-medium fs-5 mt-4 mb-3">Sobre a ONG</span>

                <div className="col-12 col-md-12">
                  <span className="fw-medium">Missão da ONG *</span>
                  <textarea
                    name="sobre"
                    className="w-100 p-4 rounded-3"
                    placeholder="Descreva a missão e objetivos da sua ONG..."
                    required
                  ></textarea>
                </div>

                <div className="col-12 text-center mt-4">
                  <button className="btn w-100 btn-primary px-5 py-2 rounded-3 fw-medium">
                    Cadastrar ONG
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

export default OngCadastro;
