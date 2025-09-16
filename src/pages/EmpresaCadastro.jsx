import React from "react";
import Header from "../components/Header";

const EmpresaCadastro = () => {
  return (
    <>
      <Header />

      <div className="row justify-content-center text-center">
        <div className="col-8">
          <div className="border rounded-4 bg-white p-4 d-flex text-center justify-content-center flex-column h-100 shadow-sm">
            <h1 className="fw-normal text-success">Cadastro de Empresa</h1>
            <span>
              Registre sua empresa para encontrar ONGs e fazer doações
            </span>

            <div className="row align-items-center justify-content-center text-start mt-3">
              <span className="fw-medium fs-5">Dados Básicos da Empresa</span>
              <div className="col-6">
                <span className="fw-medium">Nome da Empresa *</span>
                <input
                  type="text"
                  className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                  placeholder="Ex: SuperMercado BomPreço"
                />
              </div>

              <div className="col-6">
                <span className="fw-medium">CNPJ *</span>
                <input
                  type="text"
                  className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                  placeholder="00.000.000/0000-00"
                />
              </div>

              <div className="col-6 mt-4">
                <span className="fw-medium">E-mail *</span>
                <input
                  type="text"
                  className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                  placeholder="Ex: contato@bompreco.com"
                />
              </div>

              <div className="col-6 mt-4">
                <span className="fw-medium">Telefone *</span>
                <input
                  type="text"
                  className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="col-6 mt-4">
                <span className="fw-medium">Senha *</span>
                <input
                  type="text"
                  className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                />
              </div>

              <div className="col-6 mt-4">
                <span className="fw-medium">Confirmar Senha *</span>
                <input
                  type="text"
                  className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                />
              </div>

              <div className="col-12 mt-4">
                <span className="fw-medium">Ramo de Atuação</span>
                <select
                  name="atuacao"
                  className="w-100 p-2 rounded-3 bg-secondary-subtle border-0"
                  placeholder
                >
                  <option value="">Selecione o ramo de atuação</option>
                  <option value="supermercado">Supermercado</option>
                  <option value="farmacia">Farmácia</option>
                  <option value="restaurante">Restaurante</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <span className="fw-medium fs-5 mt-5">Endereço</span>
              <div className="col-9">
                <span className="fw-medium">Rua *</span>
                <input
                  type="text"
                  className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                  placeholder="Ex: Rua do Comércio"
                />
              </div>

              <div className="col-3">
                <span className="fw-medium">Número *</span>
                <input
                  type="text"
                  className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                  placeholder="000"
                />
              </div>

              <div className="col-4 mt-4">
                <span className="fw-medium">Complemento</span>
                <input
                  type="text"
                  className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                  placeholder="Sala 101"
                />
              </div>

              <div className="col-4 mt-4">
                <span className="fw-medium">Bairro *</span>
                <input
                  type="text"
                  className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                  placeholder="Vila Nova"
                />
              </div>

              <div className="col-4 mt-4">
                <span className="fw-medium">CEP *</span>
                <input
                  type="text"
                  className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                  placeholder="12345-678"
                />
              </div>

              <div className="col-6 mt-4">
                <span className="fw-medium">Cidade *</span>
                <input
                  type="text"
                  className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                  placeholder="São Paulo"
                />
              </div>

              <div className="col-6 mt-4">
                <span className="fw-medium">Estado *</span>
                <input
                  type="text"
                  className="w-100 rounded-3 border-0 bg-secondary-subtle p-2"
                  placeholder="SP"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpresaCadastro;
